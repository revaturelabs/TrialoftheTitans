public with sharing class QCInterviewAuraController {


    // ***CURRENTLY NOT IN USE***
    @AuraEnabled
    public static void InsertInterviewData(QC_Interview__c qcInterview, List<QC_Question_Answer__c> qcQA, List<QC_Flag__c> qcFlags) {

        insert qcInterview;

        for (QC_Question_Answer__c qa : qcQA){
            qa.QC_Interview__c = qcInterview.Id;
        }
        for (QC_Flag__c flag : qcFlags){
            flag.QC_Interview__c = qcInterview.Id;
        }

        insert qcQA;
        insert qcFlags;
    }
}