public with sharing class HeroListController {
    @AuraEnabled
    public static List<Account> HeroList(String cohort){
        Schema.DescribeSObjectResult acctDesc = Account.SObjectType.getDescribe();
        Map<String, Schema.RecordTypeInfo> acctRecTypeMap = acctDesc.getRecordTypeInfosByName();
        Id heroTypeId = acctRecTypeMap.get('Hero').getRecordTypeId();
        
        return [SELECT Name, Squad__r.name, Team__r.name, Cohort__c, Website FROM Account WHERE RecordTypeId = :heroTypeId AND Cohort__c = :cohort];
    }
    
}