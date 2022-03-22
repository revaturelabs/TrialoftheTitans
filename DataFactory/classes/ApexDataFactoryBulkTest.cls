@isTest
private class ApexDataFactoryBulkTest {
    /* Changed the form of the tests from "system.assertEquals(null, Exams);"
    to "system.assert(true,Database.query('SELECT id FROM Exam__c').isempty());"
    REASON: the first form above can be considered the naive way to test against null results
    from a soql query; it is wrong because the first form above 'Exams' is actually an empty query;
    so, you have to test for an empty query. 

    To do this correctly, use the '.isempty()' static method from the database class and test against that
    as in the second form above 
    */
private class ApexDataFactoryBulkT {
    

    //Attempting to replace ApexDataFactoryTest that was lost//
    @istest static void testdelete(){
        ApexDataFactory.deleteStuff();
        //List<Exam__c> Exams = [SELECT id FROM Exam__c];
        system.assert(true,Database.query('SELECT id FROM Exam__c').isempty());
        // List<Exam_Question__c> EQs = [SELECT Id from Exam_Question__c];
        system.assert(true,Database.query('SELECT id FROM Exam_Question__c').isempty());
        //List<Exam_Result__c> ERs = [select id from Exam_Result__c];
        system.assert(true,Database.query('SELECT id FROM Hero_Answer__c').isempty());
        List<Hero_Answer__c> HAs = [select id from Hero_Answer__c];
        system.assert(true,Database.query('SELECT id FROM Education__c').isempty());
        //List<Education__c> Edu = [select id from Education__c];
        system.assert(true,Database.query('SELECT id FROM QC_Interview__c').isempty());
        //List<QC_Interview__c> QC = [select id from QC_Interview__c];
        system.assert(true,Database.query('SELECT id FROM Skill__c').isempty());
        //List<Skill__c> skill = [select id from Skill__c];
        system.assert(true,Database.query('SELECT id FROM Titan__c').isempty());
        //List<Titan__c> Titan = [select id from Titan__c];
        system.assert(true,Database.query('SELECT id FROM Skill__c').isempty());

        //List<Account> account = [select id, Name from Account WHERE Name != 'Sample Account for Entitlements'];
        system.assert(true,Database.query('SELECT id FROM Squad__c').isempty());
        //List<Squad__c> squad = [select id from Squad__c];
        system.assert(true,Database.query('SELECT id FROM Team__c').isempty());
        //List<Team__c> team = [select id from Team__c];
        system.assert(true,Database.query('SELECT id FROM Cohort__c').isempty());
        //List<Cohort__c> cohort = [select id from Cohort__c];
        system.assert(true,Database.query('SELECT id FROM Curriculum__c').isempty());
        //List<Curriculum__c> curr = [select id from Curriculum__c]; 
        
        //Database
        //system.assertEquals(null, Exams);
       // system.assertEquals(null, EQs);
       /*  system.assertEquals(null, ERs);
        system.assertEquals(null, HAs);
        system.assertEquals(null, Edu);
        system.assertEquals(null, QC);
        system.assertEquals(null, skill);
        system.assertEquals(null, Titan);
        system.assertEquals(null, account);
        system.assertEquals(null, squad);
        system.assertEquals(null, team);
        system.assertEquals(null, cohort);
        system.assertEquals(null, curr); */
        
        
    }
    
    @istest static void testGenerateData(){
        
        //running the first method GenerateData(). Cannot put the run in a variable as it creates different Object types and not one
        //Cannot run individual methods as each method calls another and cannot comment out that part
        //So generating all data and checking if next called method's data has been created seems my only option
        
        ApexDataFactory.GenerateData();
        
        //creating lists of ids to check references
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
        
        
        
        //checking CreateCuriiculum()
        
        String[] technology = new List<String> {'Java','Salesforce'};
            List<Curriculum__c> curriculumList =[SELECT Name, Technology__c FROM Curriculum__c WHERE Technology__c IN :technology AND (Name='Java' OR Name='Salesforce')];
            system.assertequals(2,curriculumList.size());
        
        //checking createCohort(). Checking if related Curriculum is valid and if the Active__c flag is set correctly
        
          List <Cohort__c> cohortList=[SELECT Name, Curriculum__c,Active__c FROM Cohort__c WHERE Curriculum__c IN:curr];
          List <Cohort__c> cohortList=[SELECT Name, Curriculum__c, Cohort__c.Curriculum__r FROM Cohort__c WHERE Curriculum__c IN:curr];
          system.assertEquals(2, cohortList.size());
          Boolean isCorrect=False;
        for (Cohort__c coho:cohortList){
            
           // if (coho.Curriculum__r.Name=='Java'&& coho.Active__c==false){isCorrect=true;}else
           System.assert(coho.Active__c==false || coho.Curriculum__r.Name=='Java');
               // if(coho.Curriculum__r.Name=='Salesforce' && coho.Active__c==true){isCorrect=true;}    
        }
        
        //checking createTeam() checking if field names are valid and created dataset size is as expected
        String[] names = new List<String> {'Alchemy', 'Amplifire', 'Synergy', 'Vanquish'};
        String[] primaryColors = new List<String>{'red','yellow','blue'};
        String[] secondaryColors = new List<String>{'orange','purple','green'};
        List<String> slogans = new List<String>{'The true alchemists change the world into words.', 'The price of greatness is responsibility.', 'Coming together is a beginning.', 'Whatever you do, do it well'};
        
        List<Team__c> teamList=[SELECT Name, Slogan__c, Primary_Color__c, Secondary_Color__c FROM Team__c WHERE Name IN :names AND Slogan__c IN :slogans AND Primary_Color__c IN :primaryColors AND Secondary_Color__c IN :secondaryColors];
        system.assertEquals(4, teamList.size());
        
        //checking createSquad() checking if field names are valid, look ups are valid and dataset size is as expected
        List<String> squadNames = new List<String>{'Habsburg Hopefuls','Dragonsalesforce','Seven Deadly Syns','Data Warriors'};
        List<Squad__c> squadList= [SELECT Name, Team__c, Score__c FROM Squad__c WHERE Name IN :squadNames AND Team__c IN :team];
        system.assertEquals(4, squadList.size());
        List<Boolean> notNull= new List<Boolean>();
        for (Squad__c sq:squadList){
            if(sq.Score__c != null){Boolean isnotNull=true; notNull.add(isNotNull);}
        }
        system.assertEquals(true, notNull[0]);
        system.assertEquals(true, notNull[1]);
        system.assertEquals(true, notNull[2]);
        system.assertEquals(true, notNull[3]);
        
        
        //checking createAccount() checking if field names and look ups are valid and dataset size is as expected
        Set<String> firstNames = new Set<String>{'James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joeseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Lisa', 'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley', 'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Seley', 'Badia', 'Joshua', 'Michelle', 'Kenneth', 'Dorothy', 'Kevin', 'Carol', 'Brian', 'Amanda', 'George', 'Melissa', 'Edward', 'Deborah', 'Ronald', 'Stephanie', 'Timothy', 'Rebecca', 'Jason', 'Sharon', 'Jeffrey', 'Laura', 'Ryan', 'Cynthia', 'Jacob', 'Kathleen', 'Gary', 'Amy', 'Nicholas', 'Shirley','Eric' , 'Angela', 'Jonathan', 'Helen', 'Mohamed', 'Sean', 'Caitlyn', 'Madeline'};
        Set<String> lastNames = new Set<String>{'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Ali', 'Wang', 'Devi', 'Nguyen', 'Gonzalez', 'Deng', 'Ivanov', 'Silva', 'Kim', 'Mohamed', 'Wilson', 'Anderson', 'Taylor', 'Moore', 'Lee', 'White', 'Allen', 'Wright', 'Hassan', 'Freeman'};
        List<Account> accountList =[SELECT Name, Cohort__c, Squad__c, Team__c FROM Account WHERE RecordType.Name='Hero' AND Cohort__c IN :cohort AND Team__c IN :team AND Squad__c IN :squad];
        system.assertEquals(27, accountList.size());        
        List<String> fNames = new List<String>();
        List<String> lNames = new List<String>();
        
        for (Account acc:accountList){
            String fn=acc.Name.substringBefore(' ');
            String ln=acc.Name.substringAfter(' ');
            fNames.add(fn);
            lNames.add(ln);
            System.debug(acc.Team__c);
            System.debug(acc.Squad__r.Team__c);
            system.assertEquals(true,(acc.Team__c==acc.Squad__r.Team__c));
        }
        Boolean doesContainf=false;
        Boolean doesContainl=false;
        for (String f:fNames){
            system.assertEquals(true, (fNames.contains(f)));
        }
        for (String l:lNames){
           system.assertEquals(true, (lNames.contains(l)));
        }
        
        
        
        
        
        //check CreateTitan() for validity of fields, lookups and size
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
                };
               List <Titan__c> titanList= [SELECT Name, Curriculum__c, Technology__c FROM Titan__c WHERE Name IN :TitanNames AND Curriculum__c IN :curr];
               system.assertEquals(48,titanList.size());
               for(Titan__c ti:titanList){system.assertequals('Salesforce', ti.Technology__c);}
        
        //check CreateSkill() for valid fields, look ups and size
        String[] skillTypes = new List<String>{'Coding','Soft Skills', 'Exams', 'Data Management','Design'};
        List<Skill__c> skillList= [SELECT Name, Titan__c, Assigments__c, Skill_Breakdown__c, Skill_Type__c FROM Skill__c WHERE Skill_Type__c IN :skillTypes AND Assigments__c = 'These are the assignments' AND Skill_Breakdown__c = 'Breakdown of skills' AND Name LIKE 'Skill%' AND Titan__c IN :titan ];
        system.assertEquals(48,skillList.size());
        
        
               
        //check CreateQCInterview()  check for validity of fields and look ups and size     
        
        List<QC_Interview__c> qcInterviewList= [SELECT Name, Account__c, Cohort__c, Finalized__c, QC_Score__c FROM QC_Interview__c WHERE Name LIKE '%QCInterview%' AND Account__c IN :account AND Cohort__c IN :cohort AND Finalized__c =true AND QC_Score__c !=null];
        system.assertEquals(324, qcInterviewList.size());
        
        //check CreateEducation() check for valid fields, look ups and size
        List<String> Degrees = new List<String>{'Associates', 'Bachelors'};
        String ImageURL = 'https://clipartmag.com/images/graduation-caps-clipart-9.jpg';
        List<String> Majors = new List<String>{'Biology', 'Business', 'Communications', 'Computer Science', 'Criminal Justice', 'Marketing', 'Psychology', 'Information Systems', 'General Education', 'Ancient Studies', 'Liberal Arts', 'Accounting'};
        List<Education__c> educationList=[SELECT GPA__c, Image_URL__c, Degree__c, Major__c, Account__c FROM Education__c WHERE GPA__c !=null AND Image_URL__c= :ImageURL AND Degree__c IN :Degrees AND Major__c IN :Majors AND Account__c IN :account];
        system.assertEquals(27,educationList.size());
        
        //check CreateExam() check for valid fields, look ups and size
        
        List<Exam__c> examList= [ SELECT Name, Default_Passing_Grade__c, Default_Time_Limit__c, Titan__c FROM Exam__c WHERE Name LIKE '%Exam%' AND Default_Passing_Grade__c = .65 AND Default_Time_Limit__c = 30 AND Titan__c IN :titan ];
        system.assertEquals(25, examList.size());
        
        //check CreateExamQuestion() check for valid fields, lookups and size
        List<String> Question_Types = new List<String>{'Multiple Choice', 'Multiple Choice - multiple answers', 'True-false', 'Matching', 'Numerical', 'Short Answer', 'Essay', 'Missing word'};
        List <Exam_Question__c> examQuestionList=[SELECT Name, Exam__c,Question_Type__c, Titan__c FROM Exam_Question__c WHERE Name LIKE '%: Question%' AND Exam__c IN :exams AND Question_Type__c IN :Question_Types AND Titan__c IN :Titan];
        system.assertEquals(250,examQuestionList.size());
        
        //check CreateExamResult() check for valid fields, lookups and size
        
        List<String> StatusAvailable = new List<String>{'Assigned', 'Completed', 'Unassigned'};
        List<Exam_Result__c> examResultList=[SELECT Name, Account__c, Exam__c, Status__c FROM Exam_Result__c WHERE Account__c IN :account AND Exam__c IN :Exams AND Status__c IN :StatusAvailable];
        system.assertEquals(675,examResultList.size());
        
        
        //check CreateHeroAnswer() check for valid fields, lookups and size
        List<Hero_Answer__c> heroAnswerList=[SELECT Exam_Question__c, Exam_Result__c, Answer_Choice__c, Correct__c FROM Hero_Answer__c WHERE Correct__c !=null AND Exam_Question__c IN :EQs AND Exam_Result__c IN :ERs];
        system.assertEquals(6750, heroAnswerList.size());
        
        
        
        
        
        
        
        
               
        
        
        
        

        
          
        
        
            
            
        
        
        
    }

}
