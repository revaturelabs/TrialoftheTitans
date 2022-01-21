public with sharing class headerHelper {
    @AuraEnabled(cacheable=true)
    public static list<Team__c> getTeamInfo(){
        return [SELECT Name,In_Lead__c,Primary_Color__c,Secondary_Color__c,Slogan__c FROM Team__c WHERE In_Lead__c=: true];
    }
    @AuraEnabled(cacheable=true)
    public static Curriculum__c getTechInfo(){
        id userId = UserInfo.getUserId();
        User conObj = [SELECT name,ContactId,Id FROM User WHERE Id=: userId LIMIT 1];
        id conId = conObj.ContactId;
        Contact accObj = [SELECT name,AccountId,Id FROM Contact WHERE Id=: conId LIMIT 1];
        id accId = accObj.AccountId;
        Account curObj = [SELECT name,Curriculum__c,Id FROM Account WHERE Id=: accId LIMIT 1];
        id curId = curObj.Curriculum__c;
        return [ SELECT name,Technology__c,Id FROM Curriculum__c WHERE Id=: curId LIMIT 1];
    }
}
