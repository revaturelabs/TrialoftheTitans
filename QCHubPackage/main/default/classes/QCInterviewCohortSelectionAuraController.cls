/////////////////////////////////////////////////////
//
//  Name: QCInterviewCohortSelection
//  Author: Natalie Clark
//  Description: Aura component segment meant for reference
//  to be displayed on selection of Cohort from Hub page in aura:if
//
///////////////////////////////////////////////////

public with sharing class QCInterviewCohortSelectionAuraController {

    // used to initialize the hero list based off of selected cohort param
    @AuraEnabled
    public static List<Account> getHeroes(Cohort__c cohort){
        try {
            String cid = cohort.id;
            List<Account> a = [SELECT Name, Cohort__r.Name, Squad__r.Name
                                FROM Account
                                WHERE Cohort__c=:cid];

            return a;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<QC_Interview__c> getInterviews(List<Account> heroes){
        try {
            List<String> hid = new List<String>();
            for(Account h : heroes) {
                hid.add(h.id);
            }

            List<QC_Interview__c> qci = [SELECT Name, QC_Score__c, Finalized__c 
                                        FROM QC_Interview__c 
                                        WHERE Account__c IN :hid];

            return qci;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

}