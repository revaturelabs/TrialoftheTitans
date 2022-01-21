public with sharing class ExamComparisonController {

    @AuraEnabled(cacheable=true)
    public static List<Exam_Result__c> RecentExamResults(String TitanId){
        List<Exam_Result__c> RecentExams = [SELECT Score__c, Pass__c, Exam__r.Name FROM Exam_Result__c WHERE Exam__r.Titan__c =:TitanId ORDER BY CreatedDate DESC LIMIT 5];
        return RecentExams;
    }

}
