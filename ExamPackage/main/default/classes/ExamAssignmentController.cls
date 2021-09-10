public class ExamAssignmentController {
    @AuraEnabled
    public static List<Exam_Result__c> getExams() {
        return [SELECT Id ,Account__r.Name, Exam__r.Name, Status__c FROM Exam_Result__c];
    }
}
