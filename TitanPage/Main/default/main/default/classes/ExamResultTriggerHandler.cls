public class ExamResultTriggerHandler {

    public static void sendChatterMessageForTitanCompletion(List<Exam_Result__c> listOfExamResults){
        for(Exam_Result__c er : listOfExamResults){
            
            //Exam__c exam = [SELECT Prerequisite_For__c FROM Exam__c WHERE ]
            
            if(true/*exam_result looks up to an exam that has the "prerequisite_for__c" field as null)*/{
                
              
                
                //Step 1: get Current User Id
               
               //Step 2: get user chatter group
               //
               //Step 3: Create Message appropriate to the current user
               //
               //Step 4: Post Message to the chatter group 
               //
               //
                }
        }
    }
}