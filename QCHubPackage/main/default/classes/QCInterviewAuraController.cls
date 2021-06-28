public with sharing class QCInterviewAuraController {
    
    // Create a new interview with current data, then return it to the component so that its ID
    // is known when answers are uploaded to the database (we do this each time a question is
    // answered, to minimize risk of data loss)
    @AuraEnabled
    public static QC_Interview__c CreateInterview(Id heroId, String heroName, Id cohortId, String week){

        QC_Interview__c newInterview = new QC_Interview__c(Account__c=heroId, Cohort__c=cohortId, Name=heroName + ' ' + week);
        insert newInterview;

        return newInterview;
    }


    @AuraEnabled
    public static void InsertQAData(Id interviewId, String heroAnswerStr){

        QC_Question_Answer__c heroAnswer = (QC_Question_Answer__c) JSON.deserialize(heroAnswerStr, QC_Question_Answer__c.class);

        heroAnswer.QC_Interview__c = interviewId;
        insert heroAnswer;

    }


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