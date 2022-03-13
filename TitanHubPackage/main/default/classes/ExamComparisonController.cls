public without sharing class ExamComparisonController {

    @AuraEnabled(cacheable=true)
<<<<<<< HEAD
    public static List<Exam_Result__c> RecentExamResults(String TitanId){
        List<Exam_Result__c> RecentExams = [SELECT Exam__r.Name, Score__c, Pass__c FROM Exam_Result__c WHERE Exam__r.Titan__c =:TitanId ORDER BY CreatedDate DESC LIMIT 5];
=======
    public static List<Exam_Result__c> RecentExamResults(Id titanId){
        List<Exam_Result__c> RecentExams = [SELECT Exam__r.Name, Score__c, Pass__c FROM Exam_Result__c WHERE Exam__r.Titan__c=:titanId ORDER BY LastModifiedDate DESC LIMIT 5];
>>>>>>> origin/Iteration-X-MergeTest
        return RecentExams;
    }

}
