public with sharing class QCQuestionEditController {
     
    @AuraEnabled
     public static List<QC_Question__c> getQCQuestion(ID recordID ,Integer pageSize, Integer pageNumber) {
         Integer offset = (pageNumber - 1) * pageSize;
         List<QC_Question__c> qcQuestionList = new List<QC_Question__c>();

         qcQuestionList= [SELECT ID,Name,QC_Question_Deck__c,Expected_Answer__c,Question_Body__c  FROM QC_Question__c LIMIT :pageSize OFFSET :offset];
         return  qcQuestionList;
    }
    @AuraEnabled
    public static void deleteQCQuestion( QC_Question__c qcq ){

        delete qcq;


    }
    
    @AuraEnabled
    public static void updateQCQuestion( QC_Question__c qcqUpdate){

        update qcqUpdate;


    }
}
