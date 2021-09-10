public with sharing class QCQuestionExportApexController {
    @AuraEnabled
    public static List<QC_Question__c> getQCQuestions() {
        List<QC_Question__c> questions = new List<QC_Question__c>();
        for(QC_Question__c question : [SELECT Name, Question_Body__c, Expected_Answer__c FROM QC_Question__c]){
            questions.add(question);
        }
        return questions;
    }
}
