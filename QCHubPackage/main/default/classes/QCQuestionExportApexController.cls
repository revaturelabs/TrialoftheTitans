public class QCQuestionExportApexController {
    @AuraEnabled
    public static List<QC_Question__c> getQCQuestions() {
        return [SELECT Name, Question_Body__c, Expected_Answer__c FROM QC_Question__c];
    }
}
