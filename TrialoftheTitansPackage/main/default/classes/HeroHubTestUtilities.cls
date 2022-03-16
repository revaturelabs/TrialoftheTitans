/////////////////////////////////////////////////////
//
//  Name: HeroHubTestUtilities
//  Author: Josh Miccolo
//  Created: 5/24/2021
//  Updated: 9/3/2021
//  Description: Utility methods for the HeroHubControllerTest class.
//  
//
///////////////////////////////////////////////////

public class HeroHubTestUtilities {
    
    //fullSetup calls upon a few functions in the class for easy set up.
    
    public static void fullSetup(){
        createTitans();
        createExams();
        createQuestions();
        createExamResults();
        createAnswers();
    }
    
    /*createUsers() creates an adminUser and then uses that user to create a new user.
    Both users are inserted into the database at the end.*/
    
    public static void createUsers(){
        Profile adminProfile = [SELECT Id FROM Profile WHERE Name = 'System Administrator' LIMIT 1];
        UserRole customerManager = [SELECT Id FROM UserRole WHERE Name = 'Customer Manager' LIMIT 1];

        //Create adminUser with the admin profile
		User adminUser = new User( profileId = adminProfile.Id,
						   		 username = 'admin' + Crypto.getRandomInteger() + '@yahoo.com',
						   		 email = 'test@test.com',
								 emailencodingkey = 'UTF-8',
								 localesidkey = 'en_US',
								 languagelocalekey = 'en_US',
								 timezonesidkey = 'America/Los_Angeles',
								 alias = 'testAd',
								 lastname = 'testAdmin',
                                 userRoleId = customerManager.Id
                               );
            
        database.insert(adminUser);
        
        //Create teams as the adminUser
        System.runAs(adminUser){
            Team__c newTeam = new Team__c(Name = 'TestTeam');
            database.insert(newTeam);

            Squad__c newSquad = new Squad__c(Name = 'TestSquad', Team__c = newTeam.Id);
            database.insert(newSquad);                

            Cohort__c newcohort = new Cohort__c(Name = 'Testcohort');
            database.insert(newcohort);                

            Account newAccount = new Account(name='User', Team__c = newTeam.Id, Squad__c = newSquad.Id, Cohort__c = newCohort.Id);
            database.insert(newAccount);           

            Contact newContact = new Contact(lastName='User', AccountId = newAccount.id);
            database.insert(newContact);
            
            // Get Hero profile from database to use for Users
            Profile heroProfile = [SELECT Id FROM Profile WHERE Name = 'Hero' LIMIT 1];
            User testUser = new User( profileId = heroProfile.id,
                                    username = newContact.lastName + Crypto.getRandomInteger() + '@yahoo.com',
                                    email = 'test@test.com',
                                    emailencodingkey = 'UTF-8',
                                    localesidkey = 'en_US',
                                    languagelocalekey = 'en_US',
                                    timezonesidkey = 'America/Los_Angeles',
                                    alias = 'testUser',
                                    lastname = newContact.lastName,
                                    contactId = newContact.id
                                );
                                
            database.insert(testUser);
            
            //Get a permission set group Id with the DeveloperName 'TrialOfTheTitansHeroPermissions'
            Id groupID = [SELECT Id FROM PermissionSetGroup 
                            WHERE DeveloperName = 'TrialOfTheTitansHeroPermissions' 
                            LIMIT 1].Id;

            //create assignment for the permission set with the queried Id above.
            PermissionSetAssignment assignment = new PermissionSetAssignment(PermissionSetGroupId = groupId, AssigneeId = testUser.Id);
            Database.insert(assignment);
        }	
    }
    
    /*createWrongUser() inserts trainers into the database to test some negative cases */
    
    public static void createWrongUser(){
        //Create new trainer account
        Account newAccount = new Account(name='Trainer' );
        insert newAccount;
        
        // Get Hero profile from database to use for Users
        Profile trainerProfile = [SELECT Id FROM Profile WHERE Name = 'TitanTrainer' LIMIT 1];
        
        //Create the trainer user
		User newUser = new User( profileId = trainerProfile.id,
						   		 username = 'Trainer' + Crypto.getRandomInteger() + '@yahoo.com',
						   		 email = 'test@test.com',
								 emailencodingkey = 'UTF-8',
								 localesidkey = 'en_US',
								 languagelocalekey = 'en_US',
								 timezonesidkey = 'America/Los_Angeles',
								 alias = 'TTrain',
                                 lastName = 'Trainer'
								 );
        insert newUser; 
    }

    /*createTitans() creates three titans for Process Automation, Data Modeling, and Apex */
    
    public static void createTitans(){
        // Create curriculum and Titans for Exams
        Curriculum__c newCurriculum = new Curriculum__c(Name='Salesforce');
        insert newCurriculum;
        List<Titan__c> newTitans = new List<Titan__c>();
        List<String> titanNames = new List<String>{'Process Automation', 'Data Modeling', 'Apex'};
        
        //For each name, create a new titan with that name.
        for(String name : titanNames){
            Titan__c newTitan = new Titan__c(
                Name = name, Technology__c = newCurriculum.Name,  Curriculum__c = newCurriculum.Id);
            newTitans.add(newTitan);
        }
        database.insert(newTitans);
    }
    
    /*createExams() inserts three exams into the database for testing. */
    
    public static void createExams(){
        List<Titan__c> titans = [SELECT Id, Name FROM Titan__c];
        List<Exam__c> newExams = new List<Exam__c>();
        
        //Create three exams for each titan made during test setup.
        for(Titan__c titan : titans){
            for(Integer i = 0; i < 3; i++){  
                Exam__C newExam = new Exam__c( Name='testExam'+ i, Default_Passing_Grade__c = 65.0, Titan__c = titan.Id );            	
                newExams.add(newExam);
            }    
        }
        database.insert(newExams);
    }
    

    /*createQuestions() inserts five questiosn in the database to be used in testing */
    
    public static void createQuestions(){
		List<Exam_Question__c> newQuestions = new List<Exam_Question__C>();

        for(Integer i = 0; i < 5; i++){
                Exam_Question__C newQuestion = new Exam_Question__c( Name = 'Test' + i );
                newQuestions.add(newQuestion);
        }
        database.insert(newQuestions);
    }
    
    /*createExameResults() inserts exam results into the database for every exam */
    
    public static void createExamResults(){
        Account testAccount = [SELECT Id FROM Account WHERE Name = 'User' LIMIT 1][0];
       	List<Exam__c> testExams = [SELECT Id FROM Exam__c];
        List<Exam_Result__c> newResults = new List<Exam_Result__c>();
        
        //For loop appends graded exam results to the list of newResults
        for(Exam__c exam: testExams){
            Exam_Result__c newResult = new Exam_Result__c(Exam__c = exam.Id, Account__c = testAccount.Id);
            newResult.Graded__c = true;
            newResults.add(newResult);
        }

        //For loop appends ungraded exam results to the list of newResults
        for(Exam__c exam: testExams){
            Exam_Result__c newResult = new Exam_Result__c(Exam__c = exam.Id, Account__c = testAccount.Id);
            newResult.Graded__c = false;
            newResults.add(newResult);
        }
        database.insert(newResults);
    }
    
    
    /* createAnswers inserts an answer for every exam question and for every exam result*/
    
    public static void createAnswers(){
        //Query list of exam questions and results
        List<Exam_Question__c> newQuestions = [SELECT Id FROM Exam_Question__c];
        List<Exam_Result__c> newResults = [SELECT Id FROM Exam_Result__c];
        List<Hero_Answer__c> newAnswers = new List<Hero_Answer__c>();
        
        //for every question and for every result create a new hero answer.
        for(Exam_Question__c question : newQuestions){ 
            for(Exam_Result__c result : newResults){	
            	Hero_Answer__c newAnswer = new Hero_Answer__c(
                    Exam_Question__c = question.id, 
                    Exam_Result__c = result.id, 
                    Correct__c = true);
                newAnswers.add(newAnswer);  
            }	
       	}
        database.insert(newAnswers);
    }
    
    /*createTeams() inserts test teams for Amplifire, Alchemy, Synergy, and Vanquish
    before inserting them into the database.*/

    
    public static void createTeams(){
        List<Team__c> teamList = new List<Team__c>();
        
        Team__c Amplifire = new Team__c(
            Name='Amplifire', Slogan__c = 'Who\'s ready to rock?!?!?!', 
            Primary_Color__c = '#ef6363', Secondary_Color__c = '#c34747'
            );
        Team__c Alchemy = new Team__c(
            Name='Alchemy', Slogan__c = 'Wizards Unite!', 
            Primary_Color__c = '#84b059', Secondary_Color__c = '#539951'
            );
        Team__c Synergy = new Team__c(
            Name='Synergy', Slogan__c = 'Code Like a Boss', 
            Primary_Color__c = '#ffdd00', Secondary_Color__c = '#fbb034'
            );
        Team__c Vanquish = new Team__c(
            Name='Vanquish', Slogan__c = 'Be a Hero!', 
            Primary_Color__c = '#7aa7e9', Secondary_Color__c = '#5f70b0'
            );
        
        teamList.add(Amplifire);
        teamList.add(Alchemy);
        teamList.add(Synergy);
        teamList.add(Vanquish);
        
        database.insert(teamList);
    }

    /*createSquads inserts at least one squad for each team made.  */    
    
    public static void createSquads(){
        List<Squad__c> squadList = new List<Squad__c>();
        List<Team__c> teamList = [SELECT Id, Name FROM Team__c];
        
        //for each team queried from the database, create squads for the teams.
        for(Team__c team: teamList){
            if(team.Name == 'Synergy'){
                squadList.add(new Squad__C(Name='TPS Reports', Team__c = team.Id));
            }
            if(team.Name == 'Amplifire'){
                squadList.add(new Squad__C(Name='This is Fire', Team__c = team.Id));
                squadList.add(new Squad__C(Name='Fire is This', Team__c = team.Id));
                squadList.add(new Squad__C(Name='Fire Fire Fire', Team__c = team.Id));
                squadList.add(new Squad__C(Name='FIRE sale', Team__c = team.Id));
            }
            if(team.Name == 'Alchemy'){
                squadList.add(new Squad__C(Name='Wizard_People', Team__c = team.Id));
            }
            if(team.Name == 'Synergy'){
                squadList.add(new Squad__C(Name='Angry Aardvarks', Team__c = team.Id));
            }
        }
        database.insert( squadList );
    }
}