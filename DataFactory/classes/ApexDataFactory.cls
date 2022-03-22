//Title: ApexDataFactory
//Purpose: Generate realistic sample records to speed up org preparation when making a new org.
//Created By: Nick de Sousa, Bao Nguyen, Ashley Bee, Elizabeth Mohan
//Date: January 13th, 2022
public with sharing class ApexDataFactory {
	//Hero Record Type is required to create certain records associated with account object
    static final String HeroTypeId = Schema.SObjectType.Account.getRecordTypeInfosByName().get('Hero').getRecordTypeId();
    @AuraEnabled
    public static void deleteStuff(){
	    //deleteStuff compiles a list of all object types we're creating and deletes them to ensure a blank slate
        List<Exam__c> Exams = [SELECT id FROM Exam__c];
        List<Exam_Question__c> EQs = [SELECT Id from Exam_Question__c];
        List<Exam_Result__c> ERs = [select id from Exam_Result__c];
        List<Hero_Answer__c> HAs = [select id from Hero_Answer__c];
        List<Education__c> Edu = [select id from Education__c];
        List<QC_Interview__c> QC = [select id from QC_Interview__c];
        List<Skill__c> skill = [select id from Skill__c];
        List<Titan__c> Titan = [select id from Titan__c];
        List<Account> account = [select id, Name from Account WHERE Name != 'Sample Account for Entitlements'];
        List<Squad__c> squad = [select id from Squad__c];
        List<Team__c> team = [select id from Team__c];
        List<Cohort__c> cohort = [select id from Cohort__c];
        List<Curriculum__c> curr = [select id from Curriculum__c];
        
        delete HAs;
        delete ERs;
        delete EQs;
        delete Exams;
        delete Edu;
        delete QC;
        delete skill;
        delete Titan;
        delete account;
        delete squad;
        delete team;
        delete cohort;
        delete curr;
    }
    @AuraEnabled
    public static void GenerateData(){
	    //GenerateData is called by the LWC component to initiate the Data Factory methods
        //CreateCurriculum();
    }
    @AuraEnabled
    public static void CreateCurriculum(){
        //curriculum variables list
        // Name
        String[] technology = new List<String> {'Java','Salesforce'};
        System.debug('In create curricula');
            
        List<Curriculum__c> curriculum = new List<Curriculum__c>();
        
        //Get a list of current curricula
        List<Curriculum__c> comparedCurriculum = [SELECT Name FROM Curriculum__c];
        
        // This IF statement should determine if this is a production org or not. In most if not all cases test data should be added regardless
       // if (comparedCurriculum.size() == 0){
            
            for (integer i=0; i<2; i++){
                Curriculum__c cur = new Curriculum__c();
                cur.Technology__c = technology[i];                
                cur.Name = cur.Technology__c;
                curriculum.add(cur);
            }
            try {
                System.debug('Inserting curriculum');
                insert curriculum;
            } catch (DmlException dx) {
                System.debug('DML Exception ' + dx.getMessage());
            }
          //  CreateCohort();
       // }
        
        ////////////////////////////////
    }

	@AuraEnabled
    public static void CreateCohort() {
        System.debug('In cohort creation');
        //Create a list of cohorts to populate
        List <Cohort__c> newcohorts = new List<Cohort__c>();
        //Create a list of Curriculum to relate the cohorts to
        List <Curriculum__c> C = [SELECT Id, Name,CreatedDate FROM Curriculum__c];
        // cycle through curriculum and create a cohort for it
        for (Curriculum__c clm: C){
            system.debug(clm.CreatedDate.year());
            newcohorts.add( new Cohort__c (Name =clm.CreatedDate.year()+'-'+clm.CreatedDate.month()+'-'+clm.CreatedDate.day()+' '+ clm.Name + ' Cohort', 
                                           Active__c = false,
                                           Curriculum__c=clm.id
                                          ));
        } /*Cycle through the newly created list and set Active field to true for the Salesforce Cohort while leaving it set to false for Java*/
        for (Cohort__c ch:newcohorts){
            system.debug(ch.Name);
            If (ch.Curriculum__r.Name=='Salesforce')
            {
                ch.Active__c=true;
            }
        }
        //insert the new list newcohorts
        try{
            insert newcohorts;}catch(DMLException e){system.debug(e);}
        //CreateTeam();
    }

    @AuraEnabled
    public static void CreateTeam() {
        System.debug('In create team');
        //teams variable list
        // Name
        // Squad_Sum__c â€“ Roll up Summary (SUM) of Squad Score__c
        // In_Lead__c â€“ Checkbox
        // 
        List<Team__c> teams = new List<Team__c>();
        
        String[] names = new List<String> {'Alchemy', 'Amplifire', 'Synergy', 'Vanquish'};
        String[] primaryColors = new List<String>{'red','yellow','blue'};
        String[] secondaryColors = new List<String>{'orange','purple','green'};
        List<String> slogans = new List<String>{'The true alchemists change the world into words.', 'The price of greatness is responsibility.', 'Coming together is a beginning.', 'Whatever you do, do it well'};
                            
        for (integer i=0; i<names.size(); i++){
            Team__c newTeam = new Team__c();
            newTeam.name = names[i];
            newTeam.Slogan__c = slogans[i];       
            
            Integer primaryColorsSelection = Integer.valueOf((Math.random()*(primaryColors.size())));
            newTeam.Primary_Color__c = primaryColors[primaryColorsSelection];
            
            Integer secondaryColorsSelection = Integer.valueOf((Math.random()*(secondaryColors.size())));
            newTeam.Secondary_Color__c = secondaryColors[secondaryColorsSelection];
            
            teams.add(newTeam);
        }
        
        insert teams;
       // CreateSquad();
    }
    
    @AuraEnabled
    public static void CreateSquad(){
        System.debug('In create squad');
        //Squad Variables
        //Name
        //Score__c â€“ Number
        //Team__c -  Master detail reference to Team__c Object
        
        List<Team__c> teamIds = [SELECT Id FROM Team__c];
        List<Squad__c> squads = new List<Squad__c>();
        List<String> squadNames = new List<String>{'Habsburg Hopefuls','Dragonsalesforce','Seven Deadly Syns','Data Warriors'};
            Integer i = 0;
        for (Team__c t : teamIds){
            if (i < 4) {
                Squad__c newSquad = new Squad__c();
                newSquad.Name = squadNames[i];
                newSquad.Score__c = Integer.valueOf((Math.random()*1000));
                newSquad.Team__c = t.Id;
                
                squads.add(newSquad);
                i++;
            }	           
        }       
        
        insert squads;   
       // CreateAccount();
    }
    
    @AuraEnabled
    public static void CreateAccount(){
        System.debug('In create account');
        // accounts variables list
        
        //Name
        //Email
        //Phone
        //Cohort__c â€“ Lookup to Cohort__c Object
        //Curriculum__c â€“ Lookup to Curriculum__c Object
        //Squad__c â€“ Lookup to Squad__c Object
        //Team__c â€“  Lookup to Team__c Object
        //
        
        ////////////////////////
        List<Account> accounts = new List<Account>(); 
        List<Cohort__c> cohorts = [SELECT Name, Id, Curriculum__c FROM Cohort__c];
        List<Squad__c> squads = [SELECT Id, Team__c FROM Squad__c];
        List<Team__c> teams = [SELECT Id FROM Team__c];
        List<String> firstNames = new List<String>{'James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joeseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Lisa', 'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley', 'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Seley', 'Badia', 'Joshua', 'Michelle', 'Kenneth', 'Dorothy', 'Kevin', 'Carol', 'Brian', 'Amanda', 'George', 'Melissa', 'Edward', 'Deborah', 'Ronald', 'Stephanie', 'Timothy', 'Rebecca', 'Jason', 'Sharon', 'Jeffrey', 'Laura', 'Ryan', 'Cynthia', 'Jacob', 'Kathleen', 'Gary', 'Amy', 'Nicholas', 'Shirley','Eric' , 'Angela', 'Jonathan', 'Helen', 'Mohamed', 'Sean', 'Caitlyn', 'Madeline'};
            List<String> lastNames = new List<String>{'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Ali', 'Wang', 'Devi', 'Nguyen', 'Gonzalez', 'Deng', 'Ivanov', 'Silva', 'Kim', 'Mohamed', 'Wilson', 'Anderson', 'Taylor', 'Moore', 'Lee', 'White', 'Allen', 'Wright', 'Hassan', 'Freeman'};
                
                //create an account
                //for each cohort, create 27 accounts
                integer teamIterator = 0;
        for(Cohort__c cohort : cohorts){
            if(cohort.Name.contains('Salesforce')){
                for(integer i = 0; i < 27; i++){
                    teamIterator += 1;
                    if(teamIterator == 5){
                        teamIterator = 1;
                    }
                    Account hero = new Account();
                    Integer fnNum = Integer.valueOf(Math.random() * firstNames.size());
                    String firstName = firstNames[fnNum];
                    Integer lnNum = Integer.valueOf(Math.random() * lastNames.size());
                    String lastName = lastNames[lnNum];
                    hero.Name = firstName + ' ' + lastName;
                    hero.Phone = ('(' + Integer.valueOf((Math.random()*899)+100) + ')' + Integer.valueOf((Math.random()*899)+100) + '-' + Integer.valueOf((Math.random()*8999)+1000));
                    hero.Cohort__c = cohort.Id;
                    hero.Team__c = teams[teamIterator - 1].Id;
                    for(Squad__c squad : squads){
                        if(squad.Team__c == hero.Team__c){	
                            hero.Squad__c = squad.Id;
                        }
                    }
                    hero.RecordTypeId = HeroTypeId;
                    accounts.add(hero);
                }
            }
        }
        insert accounts; 
       // CreateTitan();
    }

    @AuraEnabled
    public static void CreateTitan() { 
        // System.debug('In create titan');
        //create a list of Titan Names leaving out the first
        List<String> TitanNames= new List<String>{
            '01 - Declarative - Data Model',
                '02 - Declarative - Org Configuration',
                '03 - Declarative - Indexing',
                '04 - Programmatic - Introduction to Apex',
                '05 - Declarative - Security & Access',
                '06 - Personal - Presentation Fundamentals',
                '07 - Tools - Git & Github',
                '08 - Declarative - Data Visualization',
                '09 - Declarative - Chatter',
                '10 - Declarative - Activities',
                '11 - Tools - SDLC',
                '12 - Programmatic - Apex Exceptions',
                '13 - Tools - Debug Logs',
                '14 - Tools - SFDX & Visual Studio Code',
                '15 - Programmatic - SOQL',
                '16 - Programmatic - SOSL',
                '17 - Declarative - External Applications',
                '18 - Declarative - Process Automation',
                '19 - Declarative - Service Cloud',
                '20 - Declarative - Sales Cloud',
                '21 - Declarative - Data Management',
                '22 - Programmatic - Apex Trigger Framework',
                '23 - Programmatic - Apex Testing Framework',
                '24 - Programmatic - HTML & CSS',
                '25 - Programmatic - Visualforce',
                '26 - Programmatic - Dynamic Apex',
                '27 - Programmatic - Asynchronous Apex',
                '28 - Programmatic - Apex Integration Services',
                '29 - Programmatic - Apex Security & Sharing',
                '30 - Programmatic - JavaScript',
                '31 - Programmatic - Lightning Aura Component Framework',
                '32 - Tools - Deployment',
                '33 - Tools - Sandboxes',
                '34 - Programmatic - Apex System & Schema Namespace Classes',
                '35 - Declarative - User Setup',
                '36 - Declarative - Auditing',
                '37 - Platform - Order of Execution',
                '38 - Programmatic - DML',
                '39 - Platform - Governor Limits',
                '40 - Programmatic - Modern Web Component Concepts',
                '41 - Programmatic - Object-Oriented Principles in Apex',
                '42 - Programmatic - Package Based Development',
                '43 - Declarative - User Interface',
                '44 - Declarative - Advanced Org Customizations',
                '45 - Programmatic - Apex Best Practices',
                '46 - Tools - Platform Events',
                '47 - Programmatic - SLDS',
                '48 - Programmatic - Lightning Web Components'
                };  /*create a list of Curricula filtered currently to Salesforce*/
                    List<Curriculum__c> currs=[SELECT Id, Name, Technology__c FROM Curriculum__c WHERE Name='Salesforce'];
        List <Titan__c> newtitans = new List<Titan__c>();
        /*For the curriculum Salesforce cycle through the list of TitanNames and assign one name at a time to a new Titan*/
        for (Curriculum__c c:currs){
            for (String tname:TitanNames){
                system.debug(tname);
                newtitans.add(new Titan__c(Name=tname,
                                           Curriculum__c= c.Id,
                                           Technology__c=c.Technology__c));
            }
        } /*insert the new list of Titans*/
        try {insert newtitans;} catch(DMLException e){system.debug(e);}
       // CreateSkill();
    }

    @AuraEnabled
    public static void CreateSkill(){
        System.debug('In create skill');
        // skills variable list
        // using Assigments__c field with typo instead of Assigments__c
        //Assigments__c - text
        //Skill_Breakdown__c - text
        // Name
        // Titan__c â€“ Master Detail Reference to Titan__c Object
        
        String[] skillTypes = new List<String>{'Coding','Soft Skills', 'Exams', 'Data Management','Design'};
            
            ///////////////////////////////////////
            List<Skill__c> skills = new List<Skill__c>();
        List<Titan__c> titans = [SELECT Id FROM Titan__c];
        integer i = 1;
        // create a skill
        for(Titan__c titan:titans){
            Skill__c newSkill = new Skill__c();
            newSkill.Name = 'Skill ' + i;
            newSkill.Assigments__c = 'These are the assignments';
            newSkill.Skill_Breakdown__c = 'Breakdown of skills';
            integer pickSkill = integer.valueOf(Math.random()*skillTypes.size());
            newSkill.Skill_Type__c = skillTypes[pickSkill];
            newSkill.Titan__c = titan.id;
            skills.add(newSkill);
            i++;
        }
        
        insert skills;
        //CreateQCInterview();
        /////////////////////////////
    }
    
    @AuraEnabled
    public static void CreateQCInterview(){
        //qcInterviews variables list
        //Name
        //Account__c â€“ Lookup reference to Account__c
        //Cohort__c â€“ Master detail reference to Cohort__c Object
        //Finalized__c â€“ Checkbox
        //QC_Score__c - Number
        //
        
        
        ///////////////////////////////////////////
        
        
        //qc interview for 12 weeks
        List<Account> accts = [SELECT Id, Name,Cohort__c FROM Account WHERE RecordTypeId =: HeroTypeId];
        List<QC_Interview__c> interview = new List <QC_Interview__c>();
        for(Account acct: accts){
                //itterarte through a group of interview questions
		for(Integer i=1; i<13; i++){
                interview.add(new Qc_interview__c (
                    //get Account Name and the week of the interview
		    name= Acct.name + ' QC Interview Week ' + i,
                    Account__c = acct.id,
		    //get Cohort information
                    Cohort__c = acct.cohort__c,
                    Finalized__c= true,
		    //calculate the score for the qc interview
                    Qc_Score__c= math.random()*100));
            }
        }
        
        insert Interview;
        /////////////////////////////////
        //CreateEducation();
    }
    
    @AuraEnabled
    public static void CreateEducation(){
        
        //Education Variables
        //Name
        //DateGratuate__c - date
        //Gpa__c - number
        List<String> Degrees = new List<String>{'Associates', 'Bachelors'};
            //Degree__c - Text
            String ImageURL = 'https://clipartmag.com/images/graduation-caps-clipart-9.jpg';
        List<String> Majors = new List<String>{'Biology', 'Business', 'Communications', 'Computer Science', 'Criminal Justice', 'Marketing', 'Psychology', 'Information Systems', 'General Education', 'Ancient Studies', 'Liberal Arts', 'Accounting'};
            //Major__c - Text
            //User__c - lookup to user
            ////////////////////////
            List<Education__c> education = new List<Education__c>();
        Date today = system.today();
        List<Account> users = [SELECT Name, Id, RecordTypeId FROM Account WHERE RecordTypeId=:HerotypeId ];
        for(Account u : users){
            Education__c edu = new Education__c();
            Integer timeTravel = Integer.valueOf(Math.Random()*7500);
            edu.DateGraduate__c = today - timeTravel;
            edu.Gpa__c = ((Math.random()*3.000000001)+2).setScale(2);
            edu.Image_URL__c = ImageURL;
            Integer pickDegree = Integer.valueOf(Math.random() * Degrees.size());
            edu.Degree__c = Degrees[pickDegree];
            Integer pickMajor = Integer.valueOf(Math.random() * Majors.size());
            edu.Major__c = Majors[pickMajor];
            edu.Name = u.Name;
            // edu.Account__c=u.Id;
            education.add(edu);
        }
        insert education;
        //CreateExam();
    }
    
    @AuraEnabled
    public static void CreateExam(){
        
        //Exam Variables
        //Name
        //Default_Passing_Grade__c - Percent
        //Default_Time_Limit__c - Number
        //Next_Exam__c - lookup reference to Exam__c
        //Titan__c - Lookup reference to Titan__c
        List<Titan__c> Titans = [SELECT Name, Id FROM Titan__c LIMIT 5];
        List<Exam__c> Exams = new List<Exam__c>();
        //create Exam
        Integer examsPerTitan = 2;
        for(Titan__c titan:Titans){
            for(Integer i = 1; i <= examsPerTitan; i++){
                Exam__c exam = new Exam__c();
                exam.Name = titan.Name + ' Exam ' + i;
                exam.Default_Passing_Grade__c = .65;
                exam.Default_Time_Limit__c = 30;
                exam.Titan__c = titan.Id;
                Exams.add(exam);
            }
        }
        insert Exams;
        List<Exam__c> createdExams = [SELECT Name, Id, Titan__c, Next_Exam__c FROM Exam__c];
        List<Exam__c> updateExams = new List<Exam__c>();
        for(Integer i = 0; i < createdExams.size(); i++){
            if(i + 1 < createdExams.size()){
                if(createdExams[i].Titan__c == createdExams[i+1].Titan__c){
                    createdExams[i].Next_Exam__c = createdExams[i+1].Id;
                }
            }
        }
        update createdExams; 
        //CreateExamQuestion();
    }
    
     @AuraEnabled
    public static void CreateExamQuestion(){
        System.Debug('In create exam question');
        
        //EQ Variables
        //Name
        //Answer_Explanation__c - long text
        //Correct_Answer_s__c - long text
        //Missing_Word__c - checkbox
        //Options__c - long text
        //Question_Text__c - long text
        List<String> Question_Types = new List<String>{'Multiple Choice', 'Multiple Choice - multiple answers', 'True-false', 'Matching', 'Numerical', 'Short Answer', 'Essay', 'Missing word'};
            //Skill__c - lookup reference to Skill__c
            //Titan__c - Reference to Titan__c
            //////////////////////////////////
            List<Titan__c> Titans = [Select id FROM Titan__c];
        List<Skill__c> Skills = [Select id, Titan__c FROM Skill__c];
        List<Exam__c>Exams = [Select Name, id, Titan__c FROM Exam__c];
        List<Exam_Question__c> questions = new List<Exam_Question__c>();
        //create EQ

        Integer questionsPerExam = 5;

        for(Exam__c exam:Exams){
            //10 questions per exam
            for(Integer i = 0; i < questionsPerExam; i++){
                Exam_Question__c EQ = new Exam_Question__c();
                EQ.Name = exam.Name + ': Question ' + (i+1);
                EQ.Answer_Explanation__c = 'Because I said so';
                EQ.Correct_Answer_s__c = 'Correct Answer';
                integer pickType = integer.valueOf(Math.random()*Question_Types.size());
                EQ.Question_Type__c = Question_Types[pickType];
                if(EQ.Question_Type__c == 'Missing word'){
                    eq.Missing_Word__c = true;
                }
                EQ.Options__c = 'There are no options';
                EQ.Question_Text__c = 'What is the answer?';
                integer skillPicker = integer.valueOf(Math.random()*Skills.size());
                EQ.Skill__c = Skills[skillPicker].id;
                EQ.Titan__c = exam.Titan__c;
                EQ.Exam__c = exam.Id;
                questions.add(EQ);
                
            }
            
        }
        system.debug(questions.size());
        insert questions;
        //CreateExamResult();
    }	
    
    @AuraEnabled
    public static void CreateExamResult(){
        
        //Exam_Result__c variables
        //Account__c reference to account
        //Exam__c reference to exam
        //Graded__c checkbox
        //Pass__c formula to checkbox
        //Passing_Grade_Override__c - leave blank
        //Score__c Formula to percent
        //Show_Answer_Explanations__c - ignore
        //Status
        List<String> StatusAvailable = new List<String>{'Assigned', 'Completed', 'Unassigned'};
            //Time_Limit_Override__c - ignore
            
        List<Account> Accounts = [SELECT Name, Id FROM Account WHERE RecordType.Name='Hero' AND Name != 'Sample Account for Entitlements'];
        
        List<Exam__c> Exams = [SELECT Name, Id FROM Exam__c];
        
        List<Exam_Result__c> Results = new List<Exam_Result__c>();
        //
        for(Account account:Accounts){
            for(Exam__c exam:Exams){
                Exam_Result__c result = new Exam_Result__c();
              /*  result.Name = account.Name + ': ' + exam.Name + ' Result';*/
                result.Account__c = account.Id;
                result.Exam__c = exam.Id;
                result.Status__c = 'Assigned';
                if(result.Score__c != null){
                    result.Graded__c = true;
                    result.Status__c = 'Completed';
                }
                Results.add(result);
                
            }
        }
        
        insert Results;
        //CreateHeroAnswer();
    }
    
    
    
    @AuraEnabled
    public static void CreateHeroAnswer(){
        
        //Hero_Answer__c variables
        //Answer_Choice__c - long text
        //Correct - Checkbox
        //Exam_Question__c - master detail reference
        //Exam_Result__c - master detail reference
        List<Exam_Question__c> Questions = [SELECT Id, Exam__c, Exam__r.Name FROM Exam_Question__c];
        List<Exam_Result__c> Results = [SELECT Id, Account__r.Name, Exam__c FROM Exam_Result__c];
        List<Account> Accounts = [SELECT Id, Name FROM Account];
        List<Hero_Answer__c> Answers = new List<Hero_Answer__c>();
        List<Exam__c> Exams = [SELECT Id, Name FROM Exam__c];
        //create Hero Answer
        
        for(Exam_Result__c result: Results){
            integer i = 0;
            for(Exam_Question__c question:Questions){
                
                if(question.Exam__c == result.Exam__c){
                    
                    Hero_Answer__c answer = new Hero_Answer__c();
                    i++;
                   /* answer.Name = result.Account__r.Name + ': ' + question.Exam__r.Name + ' Answer ' + i;*/
                    answer.Answer_Choice__c = 'This is my answer';
                    integer correctPercentage = integer.valueOf(Math.random()*100);
                    if(correctPercentage < 69){
                        answer.Correct__c = true;
                    }
                    else{
                        answer.Correct__c = false;
                    }
                    answer.Exam_Question__c = question.id;
                    answer.Exam_Result__c = result.id;
                    
                    Answers.add(answer);
                }
            }
        }
        insert Answers;
    }
    
}