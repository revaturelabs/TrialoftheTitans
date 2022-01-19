public with sharing class sideBarHelper {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccount(){
       id userId = UserInfo.getUserId();
       return [SELECT Name,Squad__C,Team__C, Cohort__C,CreatedById FROM Account Where CreatedById=: userId];
    }
    @AuraEnabled(cacheable=true)
    public static List<Squad__C> getSquad(){
        id userId = UserInfo.getUserId();
        List<Account> accList = [SELECT Name,Squad__C,Team__C, Cohort__C,CreatedById FROM Account Where CreatedById=: userId];
        id squadId = accList[0].Squad__C;
        return [SELECT name,Id From Squad__C WHERE Id=: squadId];
    }
    @AuraEnabled(cacheable=true)
    public static List<Certification__c> getCert(){
        id userId = UserInfo.getUserId();
        List<Certification__c> certList = [SELECT Assessor__c, Date_Issued__c, Image_URL__c, User__c, Verification_Site__c,Name FROM Certification__c WHERE User__c=: userId];
        return certList;
    }
    @AuraEnabled(cacheable=true)
    public static List<Education__c> getPortfolioStatus(){
        id userId = UserInfo.getUserId();
        List<Education__c> statList = [SELECT Portfolio_Status__C,Id,Name FROM Education__c WHERE User__c=: userId];
        return statList;
    }
}