public with sharing class QCInterviewWrapper {
    @AuraEnabled public Cohort__c cohort{get;set;}
    @AuraEnabled public Map<String, List<Account>> squadList{get;set;} 

    
}