public class ExamAssignmentController {
    @AuraEnabled
    public static List<Exam_Result__c> getExams(Id cohortId) {
        return [SELECT Id ,Account__r.Name, Exam__r.Name, Status__c FROM Exam_Result__c WHERE Account__r.Cohort__c = :cohortId];
    }
}
