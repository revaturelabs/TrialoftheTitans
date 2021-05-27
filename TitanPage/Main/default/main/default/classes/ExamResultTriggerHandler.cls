public class ExamResultTriggerHandler {

    public static void sendChatterMessageForTitanCompletion(List<Exam_Result__c> listOfExamResults){
        
        
        for(Exam_Result__c er : listOfExamResults){
            //get the exam the exam result is coming from
            Exam__c exam = [SELECT Prerequisite_For__c FROM Exam__c WHERE ID = er.exam__c.ID].exam__c;
            
            //get the user who the exam result belongs to 
            
            //get the squad and team of the user from the exam result
            
            //get the cohort of the user from the exam result
            
            //get the titan that the exam comes from looks up to

            if(true/*exam_result looks up to an exam that has the "Next_Exam__c" field (or whatever that field is ended up being called) as null)*/{


               //Send chatter message to appropriate team 
               //(user.name + " has just conquered the "+titan.name" Titan!")
              
               //send chatter message to appropriate cohort
               //(user.name + " has just conquered the "+titan.name" Titan!") 
               
            }
        }
    }
}