@isTest
public class HeroHubTestUtilities {
    
    @isTest
    public static void fullSetup(){
        
        createRightUser();
        createWrongUser();
        createTitans();
        createExams();
        createQuestions();
        createExamResults();
        createAnswers();
        
    }
	
    @isTest
    public static void createRightUser(){
        
        Team__c newTeam = new Team__C(Name='Amplifire');
        insert newTeam;

        Squad__c newSquad = new Squad__c(Name = 'This is Fire', Team__c = newTeam.Id);
        insert newSquad;
        
        Account newAccount = new Account(name='User', Squad__c = newSquad.Id);
        insert newAccount;
     
        Contact newContact = new Contact(lastName='User', AccountId = newAccount.id);
        insert newContact;
        
        // Get Hero profile from database to use for Users
        Profile heroProfile = [SELECT Id FROM Profile WHERE Name = 'Hero' LIMIT 1];
            
		User newUser = new User( profileId = heroProfile.id,
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
        insert newUser; 
        
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
        
        insert newTitans;
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
        
        insert newExams;
    }
    
    @isTest
    public static void createQuestions(){
  
		List<Exam_Question__c> newQuestions = new List<Exam_Question__C>();
                    
        for(Integer i = 0; i < 5; i++){
                
                Exam_Question__C newQuestion = new Exam_Question__c( Name = 'Test' + i );
                newQuestions.add(newQuestion);
            
        }
        
        insert newQuestions;
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
    
        insert newResults;
    }
    
    @isTest
    public static void createAnswers(){
        
        List<Exam_Question__c> newQuestions = [SELECT Id FROM Exam_Question__c];
        List<Exam_Result__c> newResults = [SELECT Id from Exam_Result__c];
        List<Hero_Answer__c> newAnswers = new List<Hero_Answer__c>();
        
        for(Exam_Question__c question : newQuestions){
            
            Integer i = 0; 
            for(Exam_Result__c result : newResults){
            	
            	Hero_Answer__c newAnswer = new Hero_Answer__c(Exam_Question__c = question.id, Exam_Result__c = result.id);
                if(Math.mod(i, 2) == 0){
                    
                    newAnswer.Correct__c = true;
                
                }
                else{
                	
                	newAnswer.Correct__c = false;
                    
                }
                
                newAnswers.add(newAnswer);
            }
        
        }
        
        insert newAnswers;
        
    }
}