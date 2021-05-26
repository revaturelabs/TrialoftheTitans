/////////////////////////////////////////////////////
//
//  Name: UserAccountSetup
//  Author: Josh Miccolo
//  Created: 5/24/2021
//  Updated: 5/25/2021
//  Description: Utility class to create new data for
//  the Hero Hub and Titan Page team.
//
///////////////////////////////////////////////////

public class UserAccountSetup {

    //Creates users and accounts for setup. 
    public static void UserSetUp(){
        
        Team__c newTeam = new Team__C(Name='Amplifire');
        insert newTeam;

        Squad__c newSquad = new Squad__c(Name = 'This is Fire', Team__c = newTeam.Id);
    
        List<Account> userAccounts = new List<Account>();
        
        for(Integer i = 0; i < 5; i++){
            Account newAccount = new Account(name='User'+i, Squad__c = newSquad.Id);
            userAccounts.add(newAccount);
        }
        
        insert userAccounts;
        
        List<Contact> userContacts = new List<Contact>();
        
        for(Integer i = 0; i < 5; i++){
            Contact newContact = new Contact(lastName='User'+i, AccountId=userAccounts[i].id);
            userContacts.add(newContact);
        }
        
        insert userContacts;
        
        Profile heroProfile = [SELECT Id FROM Profile WHERE Name = 'Hero' LIMIT 1];
        
        List<User> users = new List<User>();
        
        for(Integer i = 0; i < 5; i++){
            
			User newUser = new User(profileId = heroProfile.id,
						   			username = userContacts[i].lastName + Crypto.getRandomInteger() + '@yahoo.com',
						   			email = 'test'+ i +'@test.com',
									emailencodingkey = 'UTF-8',
									localesidkey = 'en_US',
									languagelocalekey = 'en_US',
									timezonesidkey = 'America/Los_Angeles',
									alias='test' + i,
									lastname=userContacts[i].lastName,
									contactId = userContacts[i].id
									);
            users.add(newUser);
        }
        
        insert users; 
        
        Curriculum__c newCurriculum = new Curriculum__c(Name='Salesforce');
        
        insert newCurriculum;
        
        List<Titan__c> newTitans = new List<Titan__c>();
        
        List<String> titanNames = new List<String>{'Process Automation', 'Data Modeling', 'Apex'};
        
        for(String name : titanNames){
        	
            Titan__c newTitan = new Titan__c(Name = name, Technology__c = newCurriculum.Name,  Curriculum__c = newCurriculum.Id);
            
            newTitans.add(newTitan);
            
        }
        
        insert newTitans;
        
        List<Exam__c> newExams = new List<Exam__c>();
        
        for(Titan__c titan : newTitans){
            
            for(Integer i = 0; i < 3; i++){
                
                Exam__C newExam = new Exam__c( Name='testExam'+ i, Default_Passing_Grade__c = 65.0, Titan__c = titan.Id );
            	
                newExams.add(newExam);
            
            }    
        
        }
        
        insert newExams;
        
        List<Exam_Question__c> newQuestions = new List<Exam_Question__C>();
        
        for(Exam__c exam: newExams){
            
            for(Integer i = 0; i < 5; i++){
                
                Exam_Question__C newQuestion = new Exam_Question__c( Name = 'Test' + i );
            	
                newQuestions.add(newQuestion);
            
            }
        }
        
        insert newQuestions;
        
        List<Exam_Result__c> newResults = new List<Exam_Result__c>();
        
        for(Exam__c exam: newExams){
            for(Account acc: userAccounts){
                Exam_Result__c newResult = new Exam_Result__c(Exam__c = exam.Id, Account__c = acc.Id);
                
                if(Math.round(Math.random()) == 1){
                    newResult.Graded__c = true;
                }

                newResults.add(newResult);
            }
        }
        
        insert newResults;
        
       	List<Hero_Answer__c> newAnswers = new List<Hero_Answer__c>();
        
        for(Exam_Question__c question : newQuestions){
            
            for(Exam_Result__c result : newResults){
            	
            	Hero_Answer__c newAnswer = new Hero_Answer__c(Exam_Question__c = question.id, Exam_Result__c = result.id);
                if(Math.round(Math.random()) == 1){
                    
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