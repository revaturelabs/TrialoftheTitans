@isTest
public class TitanPageTestUtilities {
    
    
    @isTest
    public static void fullSetup(){

        createTitans();
        createExams();
        createQuestions();
        createExamResults();
        createAnswers();
        
    }
    
    @isTest
    public static void createUsers(){
        
        Profile adminProfile = [SELECT Id FROM Profile WHERE Name = 'System Administrator' LIMIT 1];
        
        UserRole customerManager = [SELECT Id FROM UserRole WHERE Name = 'Customer Manager' LIMIT 1];
        
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
        // created a new admin user to use in a runAs to create a new transaction.
        User user1 = [SELECT Id, Name FROM USER WHERE ProfileId = :adminProfile.Id Limit 1];
        System.runAs(user1) {


           Database.insert(adminUser);
        } 
        // The above prevents a Mixed DML error.

        Team__c newTeam = new Team__c(Name = 'TestTeam');
        database.insert(newTeam);
         
        
            
        Cohort__c newcohort = new Cohort__c(Name = 'Testcohort');
        database.insert(newcohort);
            
        Account newAccount = new Account(name='User', Team__c = newTeam.Id);
        database.insert(newAccount);       
     
        Contact newContact = new Contact(lastName='User', AccountId = newAccount.id);
        database.insert(newContact);
        
       
        
        System.runAs(adminUser){
        
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
       Id groupID = [SELECT Id FROM PermissionSetGroup WHERE DeveloperName = 'TrialOfTheTitansHeroPermissions' Limit 1].Id;
      PermissionSetAssignment assignment = new PermissionSetAssignment(PermissionSetGroupId = groupId, AssigneeId = testUser.Id);

      Database.insert(assignment);
       
        
        
        
        }

         
         
        
        	
    }
    
    @isTest
    public static void createWrongUser(){
        
        Account newAccount = new Account(name='Trainer' );
        insert newAccount;
        
        // Get Hero profile from database to use for Users
        Profile trainerProfile = [SELECT Id FROM Profile WHERE Name = 'TitanTrainer' LIMIT 1];
            
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
    @isTest
    public static void createTitans(){
        
        // Create curriculum and Titans for Exams
        Curriculum__c newCurriculum = new Curriculum__c(Name='Salesforce');
        insert newCurriculum;
        
        List<Titan__c> newTitans = new List<Titan__c>();
        
        List<String> titanNames = new List<String>{'Process Automation', 'Data Modeling', 'Apex'};
        
        for(String name : titanNames){
        	
            Titan__c newTitan = new Titan__c(Name = name, Technology__c = newCurriculum.Name,  Curriculum__c = newCurriculum.Id);
            newTitans.add(newTitan);
            
        }
        
        database.insert(newTitans);
        
    }
    
    @isTest
    public static void createExams(){
        List<Titan__c> titans = [SELECT Id, Name From Titan__c];
        List<Exam__c> newExams = new List<Exam__c>();
        
        for(Titan__c titan : titans){
            
            for(Integer i = 0; i < 3; i++){
                
                Exam__C newExam = new Exam__c( Name='testExam'+ i, Default_Passing_Grade__c = 65.0, Titan__c = titan.Id );            	
                newExams.add(newExam);
            
            }    
        
        }
        
        database.insert(newExams);
    }
    
    @isTest
    public static void createQuestions(){
  
		List<Exam_Question__c> newQuestions = new List<Exam_Question__C>();
                    
        for(Integer i = 0; i < 5; i++){
                
                Exam_Question__C newQuestion = new Exam_Question__c( Name = 'Test' + i );
                newQuestions.add(newQuestion);
            
        }
        
        database.insert(newQuestions);
    }
     
    @isTest
    public static void createExamResults(){
        
        Account testAccount = [SELECT Id FROM Account WHERE Name = 'User'Limit 1];
       	List<Exam__c> testExams = [SELECT Id FROM Exam__c];
        List<Exam_Result__c> newResults = new List<Exam_Result__c>();
        
        for(Exam__c exam: testExams){
                
            	Exam_Result__c newResult = new Exam_Result__c(Exam__c = exam.Id, Account__c = testAccount.Id);
                newResult.Graded__c = true;
                newResults.add(newResult);
            
        }
        
        for(Exam__c exam: testExams){
                
            	Exam_Result__c newResult = new Exam_Result__c(Exam__c = exam.Id, Account__c = testAccount.Id);
                newResult.Graded__c = false;
                newResults.add(newResult);
            
        }
    
        database.insert(newResults);
        
        system.debug(newResults);
    }
    
    
    @isTest
    public static void createAnswers(){
        
        List<Exam_Question__c> newQuestions = [SELECT Id FROM Exam_Question__c];
        List<Exam_Result__c> newResults = [SELECT Id from Exam_Result__c];
        List<Hero_Answer__c> newAnswers = new List<Hero_Answer__c>();
        
        
        for(Exam_Question__c question : newQuestions){
            
            for(Exam_Result__c result : newResults){
            	
            	Hero_Answer__c newAnswer = new Hero_Answer__c(Exam_Question__c = question.id, Exam_Result__c = result.id, Correct__c = true);
                newAnswers.add(newAnswer);
                
            }	
       	}
        
        database.insert(newAnswers);
        
    }
    
    @isTest
    public static void createTeams(){
        List<Team__c> teamList = new List<Team__c>();
        
        Team__c Amplifire = new Team__c(Name='Amplifire');
        Team__c Alchemy = new Team__c(Name='Alchemy');
        Team__c Synergy = new Team__c(Name='Synergy');
        Team__c Vanquish = new Team__c(Name='Vanquish');
        
        teamList.add(Amplifire);
        teamList.add(Alchemy);
        teamList.add(Synergy);
        teamList.add(Vanquish);
        
        database.insert(teamList);
        
    }
    /*
    @isTest
    public static void createSquads(){
        List<Squad__c> squadList = new List<Squad__c>();
        List<Team__c> teamList = [SELECT Id, Name FROM Team__c];
        
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
    */
}