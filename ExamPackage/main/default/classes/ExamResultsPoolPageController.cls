public with sharing class ExamResultsPoolPageController {
    //Grab all question for a given Exam result
    @AuraEnabled
    public static List<Exam_Pool_Assignment__c> getExamResultPools(/*Id examId */){

        //List<Exam_Pool_Assignment__c> epa = new List<Exam_Pool_Assignment__c>();

    /*  List<Exam__c> eql  =  [SELECT Id, Name, 
        (SELECT Question_Pool__c FROM Exam_Pools__r) 
        FROM Exam__c WHERE Id IN 
        (SELECT Exam__c FROM Exam_Pool_Assignment__c WHERE Exam__c = 'a085e000000GfC5AAK')];
        System.debug(eql);
    */
        List<Exam_Pool_Assignment__c> epa = [SELECT Name, Exam__c, Question_Pool__c, Question_Pool__r.Name
                                            FROM Exam_Pool_Assignment__c 
                                            WHERE Exam__c = 'a085e000000GfC5AAK'];
                                            System.debug(epa);

        
        
        return epa;
    }
}