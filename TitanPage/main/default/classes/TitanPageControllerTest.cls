//This section is for testing getTitans
		@isTest
        public class TitanPageControllerTest {
                
 		@TestSetup
            static void testSetupMethod(){
                titanPageTestUtilities.createUsers();
                titanPageTestUtilities.fullSetup();
                
            }
    
            @isTest
            static void testFetchUser(){
                User testUser = [SELECT Id FROM USER WHERE alias = 'testUser' LIMIT 1];
    
       			 String info;
    
    			system.runAs(testUser){
        
           		 info = TitanPageApexController.fetchUser();
            
    	}
                
      //    System.AssertEquals(testUser.id; )
            }      
          
         @isTest
              static void getTitansPos(){
                   User testUser = [SELECT Id FROM USER WHERE alias = 'testUser' LIMIT 1];
                  List<Titan__c> listtitans = new List<Titan__c>();
                  system.runAs(testUser){
                      listtitans = titanpageapexcontroller.getTitans();
                  }
                  system.assertEquals(3, listtitans.size());
              }
            
            
           @isTest
              static void getSkillsPos(){
                  
                    List<Skill__c> newSkills = new List<Skill__c>();
                
                List<String> skillNames = new List<String>{'Test Skill1', 'Test Skill2', 'Test Skill3'};
                
                    for(Titan__c t : [SELECT Name FROM Titan__c]){   
                    
                		for(String name : skillNames){
                    
                    	Skill__c newSkill = new Skill__c(Name = name, Titan__c = t.ID, Skill_Breakdown__c = 'test', Skill_Type__c = 'coding', Assigments__c='Test');
                    	newSkills.add(newSkill);
                    
                }
                    }
                insert newSkills;
                  
                  
                  Titan__c testTitan = [SELECT ID FROM TITAN__C WHERE NAME='Apex'];
                  List<Skill__c> listSkills = new List<Skill__c>();
                 	
                   listSkills = titanpageapexcontroller.getSkills(testTitan.Id);
                  
                  system.assertEquals(3, listSkills.size());
              }   
            
            
          
          /*  static void getExamsPositiveTest(){
                List<Exam__c> examPositive = new List<Exam__c>();
                Id titanId = [SELECT Id FROM Titan__c WHERE Name = 'Test Titan1'];
                examPositive = TitanPageApexController.getExams(titanId);
           
            }
*/
         
        /*        
                 
                Curriculum__c newCurriculum = new Curriculum__c(Name='Salesforce');
                insert newCurriculum;
                
                List<Titan__c> newTitans = new List<Titan__c>();
                
                List<String> titanNames = new List<String>{'Test Titan1', 'Test Titan2', 'Test Titan3'};
                
                for(String name : titanNames){
                    
                    Titan__c newTitan = new Titan__c(Name = name, Technology__c = newCurriculum.Name,  Curriculum__c = newCurriculum.Id);
                    newTitans.add(newTitan);
                    
                }
                
                insert newTitans;
                 
                 
                List<Titan__c> titansGotten = TitanPageApexController.getTitans();
               
                 System.assertEquals([SELECT Name, Id FROM Titan__c], titansGotten);
            }
         public static List<Titan__c> getTitans() {
        //Method for retrieving list of titans
      
        
     	Account acc = [SELECT Curriculum__c FROM Account WHERE Name = :userInfo.getName()];
		List<Titan__c> titanList = [SELECT Name FROM Titan__c WHERE Curriculum__c = :acc.Curriculum__c];

        return titanList;
         }          
	//Now, the same thing for Exams
		@isTest
		static void ExamsTest(){
            List<Exam__c> testExams = new List<Exam__c>();
            List<Titan__c> titanList = [SELECT Name, Id FROM Titan__c];
            
            for(Titan__c t : titanList){
                for(Integer i=0; i<4; i++){
                    Exam__c createExam = new Exam__c(Name='Exam'+i, Default_Passing_Grade__c = 65.0, Titan__c = t.Id);
                    testExams.add(createExam);
                }
            }
        }
        }
    /*	insert testExams;
            List<Exam__c> examsGotten = TitanPageApexController.getExams(titanList[0].Id);
			Id titanId = titanList[0].Id;
            System.assertEquals([Select Exam__c FROM Exam__c WHERE Titan__r.iD = titanId], examsGotten);
        }
        } */
//I am unsure whether or not I need to do anything other than hardcode this indexed value titanList[0]
//this method takes only a single Id as its parameter and this only happens in the context of a specific titan being selected
//
//
//
//
//
 /*create a curriculum
                Curriculum__c newCurriculum = new Curriculum__c(Name='Salesforce');
                insert newCurriculum;
                
                //create a list of titans
                List<Titan__c> newTitans = new List<Titan__c>();
                
                List<String> titanNames = new List<String>{'Test Titan1', 'Test Titan2', 'Test Titan3'};
                
                for(String name : titanNames){
                    
                    Titan__c newTitan = new Titan__c(Name = name, Technology__c = newCurriculum.Name,  Curriculum__c = newCurriculum.Id);
                    newTitans.add(newTitan);
                    
                }
                insert newTitans;*/
            
            /*
                List<Skill__c> newSkills = new List<Skill__c>();
                
                List<String> skillNames = new List<String>{'Test Skill1', 'Test Skill2', 'Test Skill3'};
                
                    for(Titan__c t : [SELECT Name FROM Titan__c]){   
                    
                		for(String name : skillNames){
                    
                    	Skill__c newSkill = new Skill__c(Name = name, Titan__c = t.ID, Skill_Breakdown__c = 'test', Skill_Type__c = 'coding', Assigments__c='Test');
                    	newSkills.add(newSkill);
                    
                }
                    }
                insert newSkills;
                
                //create a list of exams
                List<Exam__c> testExams = new List<Exam__c>();
                
                for(Titan__c t : [SELECT Name FROM Titan__c]){
                	for(Integer i=0; i<4; i++){
                    	Exam__c createExam = new Exam__c(Name='Exam'+i, Default_Passing_Grade__c = 65.0, Titan__c = t.Id);
                    	testExams.add(createExam);
                }
            }
                insert testExams;
           }
            */
        }