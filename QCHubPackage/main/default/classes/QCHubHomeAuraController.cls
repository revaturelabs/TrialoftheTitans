public with sharing class QCHubHomeAuraController {

    @AuraEnabled
    public static List<Cohort__c> CohortsInit(){
        return [SELECT Id, Name, (SELECT QC_Score__c FROM QC_Interviews__r) FROM Cohort__c];
    }
    /*
    public List<QCCohortWrapper> CohortsInit() {
        List<QCCohortWrapper> activeCohorts = new List<QCCohortWrapper>();

    }
    */
}