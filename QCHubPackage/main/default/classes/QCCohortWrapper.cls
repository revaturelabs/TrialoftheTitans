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
    
    @AuraEnabled public List<QCSquadWrapper> squadList{get;set;}

}