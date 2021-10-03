public with sharing class QCQuestionEditController {
     
    @AuraEnabled(cacheable=true)
     public static List<QC_Question__c> getQCQuestion(ID recordID ,Integer pageSize, Integer pageNumber) {
         Integer offset = (pageNumber - 1) * pageSize;
         List<QC_Question__c> qcQuestionList = new List<QC_Question__c>();
         
         try{
         qcQuestionList= [SELECT ID,Name,QC_Question_Deck__r.Name,Expected_Answer__c,Question_Body__c  FROM QC_Question__c WITH SECURITY_ENFORCED LIMIT :pageSize OFFSET :offset ];
           
         }
         catch( System.QueryException ex)
        {
            throw new SecurityException('Your user does not have the necessary permissions');
        }
         return  qcQuestionList;
    }
    @AuraEnabled(cacheable=true)
    public static void deleteQCQuestion( QC_Question__c qcq ){

        delete qcq;


    }
    
    @AuraEnabled(cacheable=true)
    public static void deleteQCQuestionRows( List<QC_Question__c> sRows ){

        delete sRows;


    }
    
    @AuraEnabled
    public static void updateQCQuestion( QC_Question__c qcqUpdate){

        update qcqUpdate;


    }

    @AuraEnabled(cacheable=true)
    public static List<QC_Question__c> getQuestion(){

        List<QC_Question__c> questionList = new List<QC_Question__c>();
        
        try{
            questionList= [SELECT ID,Name,QC_Question_Deck__r.Name,Expected_Answer__c,Question_Body__c  FROM QC_Question__c WITH SECURITY_ENFORCED];
              
            }
            catch( System.QueryException ex)
           {
               throw new SecurityException('Your user does not have the necessary permissions');
           }
            return  questionList;
        
    }

    @AuraEnabled
    public static void deleteQuestions(list<Id> questions){
        try {
            list<QC_Question__c> questionIdsToDelete = new list<QC_Question__c>();
            System.debug('questionIds ====> '+questions);
            for(Id qc : questions) {
                questionIdsToDelete.add(new QC_Question__c(Id = qc));
            }
            if(!questionIdsToDelete.isEmpty()) {
                delete questionIdsToDelete;
            }
        }
        catch(Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }


}