//////////////////////////////////////////
//
//Name: ExamResultTriggerHandler
//Author: Abdul-Shahid Wali
//Date Created: 05/26/21
//Date Updated: 05/28/21
//Description: Handler class for the ExamResultTrigger trigger
//
//////////////////////////////////////////
//
public class ExamResultTriggerHandler {
    
    //Prevents new Exam Result objects from being created if that exam has already been assigned
    //newResults: all exam results that have been newly inserted or updated
    public static void PreventDuplicateExams(List<Exam_Result__c> newResults){
        //Get all Exam Result objects in the database
        List<Exam_Result__c> allResults = [SELECT Account__c, Exam__c, Status__c FROM Exam_Result__c];
        //Compare the newly inserted or update results against each other
        for(Integer i = 0; i < newResults.size(); i++){
            for(Integer k = newResults.size() - 1; k >= 0; k--){
                if((newResults[i].Account__c == newResults[k].Account__c) && (newResults[i].Exam__c == newResults[k].Exam__c) && (newResults[i].Status__c == 'Assigned') && (newResults[k].Status__c == 'Assigned') && (i != k)){
                    //If multiple of the same exam is assgined at once, only assign 1 and unassgined the others
               		newResults[k].Status__c = 'Unassigned';  
            	}
            }
        }
        //Compare the newly inserted or updated results against all results
        for(Exam_Result__c nr: newResults){
            for(Exam_Result__c ar: allResults){
                if((nr.Account__c == ar.Account__c) && (nr.Exam__c == ar.Exam__c) && (nr.Status__c == 'Assigned') && (ar.Status__c == 'Assigned') && (ar.Id != nr.Id)){
                    //If a new exam has already been assigned, set its status to unassigned
                    nr.Status__c = 'Unassigned';
                }
            }
        }
        
        
    }

}