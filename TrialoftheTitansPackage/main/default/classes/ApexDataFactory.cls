public with sharing class ApexDataFactory {
    static final String HeroTypeId = Schema.SObjectType.Account.getRecordTypeInfosByName().get('Hero').getRecordTypeId();
    public static void CreateTeam() {
        //teams variable list
        // Name
        // Squad_Sum__c – Roll up Summary (SUM) of Squad Score__c
        // In_Lead__c – Checkbox

        String[] primaryColors = new List<String>{'red','yellow','blue'};
        String[] secondaryColors = new List<String>{'orange','purple','green'};
        List<String> slogans = new List<String>();
        for(integer i=0; i<100; i++){
            slogans.add('Slogan '+(i+1));
        }
        //////////////////////////////////////
        List<Team__c> teams = new List<Team__c>();
        // create a team

        List<Team__c> comparedTeam = [SELECT Name FROM Team__c];
        Team__c newTeam = new Team__c();
        newTeam.name = 'Team ' + (comparedTeam.size() +1);

        Integer primaryColorsSelection = Integer.valueOf((Math.random()*(primaryColors.size()-1)));
        newTeam.Primary_Color__c = primaryColors[primaryColorsSelection];

        Integer secondaryColorsSelection = Integer.valueOf((Math.random()*(secondaryColors.size()-1)));
        newTeam.Secondary_Color__c = secondaryColors[secondaryColorsSelection];

        Integer sloganSelection = Integer.valueOf((Math.random()*(slogans.size()-1)));
        newTeam.Slogan__c = slogans[sloganSelection];

        Boolean nameTaken = false;
        for (Team__c t : comparedTeam){
            if (t.name == newTeam.name){
                nameTaken = true;
            }
        } 
        if (nameTaken == false){
            teams.add(newTeam);
            insert teams;
        }
        

        /////////////////////////////////////
    }

    public static void CreateSquad(){
        
        //Squad Variables
        //Name
        //Score__c – Number
        //Team__c -  Master detail reference to Team__c Object
        ////////////////////////////////////
        List<Squad__c> squads = new List<Squad__c>();
        List<Team__c> teamIds = [SELECT Id FROM Team__c];
        Integer teamAssignment = Integer.valueOf((Math.random()*(TeamIds.size()-1)));
        // create a squad

        Squad__c newSquad = new Squad__c();
        List<Squad__c> comparedSquad = [SELECT Name FROM Squad__c];
       	newSquad.Name = 'Squad ' + (comparedSquad.size() +1);
        newSquad.Score__c = Integer.valueOf((Math.random()*1000));
     	newSquad.Team__c = teamIds[teamAssignment].Id;
 		
        squads.add(newSquad);
        insert squads;
         //////////////////////////////////
    }

    public static void CreateCurriculum(){
        //curriculum variables list
        // Name
        String[] technology = new List<String> {'Java','Salesforce'};

        //////////////////////////////////////////
        List<Curriculum__c> curriculum = new List<Curriculum__c>();
        
        //create a curriculum
        List<Curriculum__c> comparedCurriculum = [SELECT Name FROM Curriculum__c];
        
        if (comparedCurriculum.size() == 0){
            
            for (integer i=0; i<2; i++){
                Curriculum__c cur = new Curriculum__c();
                cur.Technology__c = technology[i];                
                cur.Name = cur.Technology__c;
                curriculum.add(cur);
            } 
            insert curriculum;
            
            
        }

        ////////////////////////////////
    }

    public static void CreateTitan(){
        /*titans variables list
        Name
        Curriculum__c – Lookup reference to Curriculum__c object
        Number_of_Skills – Roll up Summary (COUNT) of Skill__c
        Technology__c - Picklist 
        */

        ///////////////////////////////////////
        List<Titan__c> titans = new List<Titan__c>();
        List<Curriculum__c> curriculum = [Select Name, Id, Technology__c FROM Curriculum__c];
        //create a titan
        List<Titan__c> comparedTitan = [SELECT Name FROM Titan__c];
        Titan__c newTitan = new Titan__c();
        newTitan.Name = 'Titan ' + (comparedTitan.size() +1);

        Integer curNum = Integer.valueOf((Math.random()*(curriculum.size())));
        newTitan.Curriculum__c = curriculum[curNum].Id;
        newTitan.Technology__c = curriculum[curNum].Technology__c;
		
        titans.add(newTitan);
        insert titans;

        /////////////////////////////
    }

    public static void CreateSkill(){
        // skills variable list
        // using Assigments__c field with typo instead of Assignments__c
        // Name
        // Titan__c – Master Detail Reference to Titan__c Object
        List<String> assignments = new List<String>();
        for(integer i=0; i<100; i++){
            assignments.add('Assignments '+ (i+1));
        }
        List<String> skillsBreakDown = new List<String>();
        for(integer i=0; i<100; i++){
            skillsBreakDown.add('Skills '+(i+1));
        }
        String[] skillTypes = new List<String>{'Coding','Soft Skills', 'Exams', 'Data Management','Design'};

		///////////////////////////////////////
        List<Skill__c> skills = new List<Skill__c>();
        List<Titan__c> titans = [SELECT Id FROM Titan__c];
        // create a skill
        List<Skill__c> comparedSkill = [SELECT Name FROM Skill__c];
        Skill__c newSkill = new Skill__c();
        newSkill.Name = 'Skill ' + (comparedSkill.size() +1);
        newSkill.Assigments__c = 'Assignment ' + (comparedSkill.size() +1);
        newSkill.Skill_Breakdown__c = 'Skill Break Down ' + (comparedSkill.size() +1);
        newSkill.Skill_Type__c = skillTypes[Integer.valueOf((Math.random()*skillTypes.size()))];
        newSkill.Titan__c = titans[0].Id;

        skills.add(newSkill);
        insert skills;

        /////////////////////////////
    }

    public static void CreateCohort(){
        //cohort variables list
        //Name
        //Active__c – checkbox
        //Average_Score__c – Number (QC_Interview_Sum__c/QC_Interview_Count__c)
        //Curriculum__c – reference to Curriculum__c Object
        //QC_Interview_Count__c – Roll Up Summary (COUNT)
        //QC_Interview_Sum__c – Roll Up Summary
		///////////////////////////////////////
		List<Curriculum__c> curriculum = [SELECT Id from Curriculum__c];
        List<Cohort__c> cohorts = new List<Cohort__C>();
        // create a cohort
        List<Cohort__c> comparedCohort = [SELECT Name FROM Cohort__c];
        Cohort__c newCohort = new Cohort__c();
        newCohort.Name = 'Cohort ' + (comparedCohort.size() +1);
        Integer active = Integer.valueOf((Math.random()*99));
        if (active < 75){
            newCohort.Active__c = true;
        }
        newCohort.Curriculum__c = curriculum[Integer.valueOf((Math.random() * (curriculum.size())))].Id;
        
        cohorts.add(newCohort);
        insert cohorts;

        ///////////////////////////////
    }

    public static void CreateAccount(){
        /* accounts variables list
        
        Name
        Email
        Phone
        Cohort__c – Lookup to Cohort__c Object
        Curriculum__c – Lookup to Curriculum__c Object
        Squad__c – Lookup to Squad__c Object
        Team__c –  Lookup to Team__c Object
        */

        ////////////////////////
        List<Account> accounts = new List<Account>(); 
        List<Cohort__c> cohorts = [SELECT Id, Curriculum__c FROM Cohort__c];
        List<Squad__c> squads = [SELECT Id, Team__c FROM Squad__c];
        
        
        //create an account
        List<Account> comparedAcc = [SELECT Name FROM Account];
        Account acc = new Account();
        acc.Phone = '123-456-7890';
        //Account does not have email field
        //acc.Email = 'email ' + (comparedAcc.size() +1);
        acc.Name = 'Account ' + (comparedAcc.size() +1);
        Integer cohortNum = Integer.valueOf((Math.random() * (cohorts.size())));
        acc.Cohort__c = cohorts[cohortNum].Id;
        Integer squadNum = Integer.valueOf((Math.random() * (squads.size())));
        acc.Squad__c = squads[squadNum].Id;
        acc.Team__c = squads[squadNum].Team__c;
        acc.Curriculum__c = cohorts[cohortNum].Curriculum__c;
        acc.RecordTypeId = HeroTypeId;
		
        accounts.add(acc);
        insert accounts;
        /////////////////////////////////////////
    }

    public static void CreateQCInterview(){
        /*qcInterviews variables list
        Name
        Account__c – Lookup reference to Account__c
        Cohort__c – Master detail reference to Cohort__c Object
        Finalized__c – Checkbox
        QC_Score__c - Number
        */
        List<String> weeks = new List<String>();
        for(integer i=0; i<12; i++){
            weeks.add('Week '+(i+1));
        }
        ///////////////////////////////////////////
        List<Account> accounts = [SELECT Id, Cohort__C FROM Account WHERE RecordTypeId =: HeroTypeId];
        system.debug(accounts[0].RecordTypeId);
        List<QC_Interview__c> qcInterviews = new List<QC_Interview__c>();
        
        // create a qc
        List<QC_Interview__c> comparedQC = [SELECT Name FROM QC_Interview__c];
        QC_Interview__c newQC = new QC_Interview__c();
        newQC.Name = 'QC ' + (comparedQC.size() +1); 
        Integer accNum = Integer.valueOf((Math.random() * (accounts.size()-1)));
        newQC.Account__c = accounts[accNum].Id;
        newQC.Cohort__c = accounts[accNum].Cohort__c;
        Integer finalized = Integer.valueOf((Math.random()*99));
        if (finalized < 75){
            newQC.Finalized__c = true;
        }
        newQC.QC_Score__c = Integer.valueOf((Math.random()*100));

        Integer weekSelection = Integer.valueOf((Math.random()*(weeks.size()-1)));
        newQC.Week__c = weeks[weekSelection];

        qcInterviews.add(newQC);
        insert qcInterviews;
        /////////////////////////////////
    }
}
