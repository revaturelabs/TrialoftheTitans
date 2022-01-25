//////////////////////////////////////////////////////////////////////////////
//
//  Name: QCCohortWrapper
//  Author: Alexander Dzhitenov
//  Description: 
//
//////////////////////////////////////////////////////////////////////////////

public with sharing class QCCohortWrapper {
    
    @AuraEnabled public Cohort__c cohort{get;set;}
    @AuraEnabled public Map<String, List<Account>> squadMap{get;set;}
    @AuraEnabled public QCSquadWrapper[] squadList{get;set;}
    @AuraEnabled public List<Account> heroList;

    /* NOTE:    This is an option, and the corresponding code can be re-enabled in QCHubHomeAuraController to populate this
                variable (it matches heroes to squads by putting a squad, and a list of the heroes in it, into a wrapper class).
                However, it might be substantially easier (and better) to just use a map between squads and accounts,
                similar to the one above, to split heroes into squads wherever it's necessary.
    @AuraEnabled public List<QCSquadWrapper> squadList{get;set;}
    */
}