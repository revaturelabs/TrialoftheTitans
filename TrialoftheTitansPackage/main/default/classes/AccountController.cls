public with sharing class AccountController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(String accId){
        return [SELECT Id, Name, Team__c, Cohort__c, Squad__c FROM Account];
    }
}