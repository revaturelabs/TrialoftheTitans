/////////////////////////////////////////////////////
//
//  Name: QCInterviewCohortSelection
//  Author: Natalie Clark
//  Description: Apex controller for aura component QCInterviewCohortSelection
//
///////////////////////////////////////////////////

public with sharing class QCInterviewCohortSelectionAuraController {

    // used to initialize the hero list based off of selected cohort param
    @AuraEnabled(cacheable=true)
    public static List<Account> getHeroes(Cohort__c cohort){
            String cid = cohort.id;
            List<Account> a = [SELECT Name, Cohort__r.Name, Squad__r.Name
                                FROM Account
                                WHERE Cohort__c=:cid
                                ORDER BY Squad__c];

            return a;
    }

    // queries for interview instances related to list of heroes in params
    @AuraEnabled(cacheable=true)
    public static List<QC_Interview__c> getInterviews(List<Account> heroes){
            List<Id> hid = new List<Id>();
            for(Account h : heroes) {
                hid.add(h.id);
            }

            List<QC_Interview__c> qci = [SELECT Name, QC_Score__c, Finalized__c 
                                        FROM QC_Interview__c 
                                        WHERE Account__c IN :hid];

            return qci;
    }

}