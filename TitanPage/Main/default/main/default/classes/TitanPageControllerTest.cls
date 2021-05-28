//This section is for testing getTitans
		@isTest
        public class TitanPageControllerTest {
                @isTest
             static void TitanTest(){
                
               //Create mock Titans to test retrieval
               //
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