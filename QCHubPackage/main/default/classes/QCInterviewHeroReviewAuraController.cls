public with sharing class QCInterviewHeroReviewAuraController {

    //init to load score for hero in order to finalize
    @AuraEnabled
    public static QC_Interview__c getInterview(Cohort__c cohort, Account hero){
        try {
            String id = cohort.id;
            String id2 = hero.id;
            List<QC_Interview__c> qci = [SELECT Name, Cohort__r.Name, Account__r.Squad__r.Name, Finalized__c, Account__r.Name, QC_Score__c 
                                        FROM QC_Interview__c
                                        WHERE Finalized__c=false AND Cohort__c=:id AND Account__c=:id2
                                        LIMIT 1];
            return qci[0];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void setFlags(List<QC_Flag__c> flags){
        try {
            insert flags;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void setInterview(QC_Interview__c interview){
        try {
            upsert interview;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    // @AuraEnabled
    // public static void set(){
    //     try {
            
    //     } catch (Exception e) {
    //         throw new AuraHandledException(e.getMessage());
    //     }
    // }

}