public with sharing class QCInterviewHeroReviewAuraController {

    //init to load score for hero in order to finalize
    @AuraEnabled
    public static List<QC_Interview__c> DoInit(Cohort__c cohort, Account hero){
        try {
            String id = cohort.id;
            String id2 = hero.id;
            List<QC_Interview__c> qci = [SELECT Name, Cohort__r.Name, Squad__r.Name, Finalized__c, Account__r.Name, Overall_Score__c 
                                        FROM QC_Interview__c
                                        WHERE Finalized__c=false AND Cohort__c=:id AND Account__c=:id2
                                        LIMIT 1];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void setFlag(List<QC_Flag__c> flag, List<QC_Interview__c> interview){
        try {
            insert flag;
            upsert interview;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    // @AuraEnabled
    // public static string methodName(){
    //     try {
            
    //     } catch (Exception e) {
    //         throw new AuraHandledException(e.getMessage());
    //     }
    // }

}

//probably want wrapper class for Account, List<QC_Flag__c>, List<QC_Question_Answer__c>