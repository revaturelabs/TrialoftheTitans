///////////////////////////////////////////////////////////////////////////////// 
// 
// Name: SidebarController
// Author: Alan Huang
// Created: 01/25/2022
// Updated: 01/25/2022
// Description: Apex controller for Sidebar LWC component
// 
/////////////////////////////////////////////////////////////////////////////////

public with sharing class SidebarController {
    
    static PermissionSet sysAdminProfile = [SELECT Profile.Id FROM PermissionSet WHERE Profile.Name='System Administrator' AND isCustom=false];
    
    public static Contact getContact() {
        User user = [SELECT ContactId, ProfileId FROM User WHERE Id=:UserInfo.getUserId()];
        
        Contact contact;
        // If running as System Admin, retrieve a debug Contact
        if (user.ContactId != null) {
            contact = [SELECT AccountId FROM Contact WHERE Id=:user.ContactId];
        } else if (user.ProfileId == sysAdminProfile.ProfileId) {
            contact = [SELECT AccountId FROM Contact LIMIT 1];
        }
        return contact;
    }
    
    @AuraEnabled(cacheable=true)
    public static Account getAccount() {
        Contact contact = getContact();
        Account account = [SELECT Name, Squad__c, Team__c, Cohort__c FROM Account WHERE Id=:contact.AccountId];
        return account;
    }
    
    @AuraEnabled(cacheable=true)
    public static Squad__c getSquad() {
        Account account = getAccount();
        return [SELECT Name From Squad__C WHERE Id=:account.Squad__c];
    }
    @AuraEnabled(cacheable=true)
    public static List<Certification__c> getCert() {
        Contact contact = getContact();
        User user;
        // If running as System Admin, retrieve debug profile
        try {
            user = [SELECT Id FROM User WHERE ContactId=:contact.Id];
        } catch (System.QueryException e) {
            user = [SELECT Id FROM User WHERE Id=:UserInfo.getUserId()];
        }
        List<Certification__c> certList = [SELECT Assessor__c, Date_Issued__c, Image_URL__c, User__c, Verification_Site__c,Name FROM Certification__c WHERE User__c=:user.Id];
        return certList;
    }
    @AuraEnabled(cacheable=true)
    public static List<Education__c> getPortfolioStatus() {
        Contact contact = getContact();
        User user;
        // If running as System Admin, retrieve debug profile
        try {
            user = [SELECT Id FROM User WHERE ContactId=:contact.Id];
        } catch (System.QueryException e) {
            user = [SELECT Id FROM User WHERE Id=:UserInfo.getUserId()];
        }
        List<Education__c> statList = [SELECT Portfolio_Status__C,Id,Name FROM Education__c WHERE User__c=:user.Id];
        return statList;
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Map<String, Object>> getAvgScorePerTitan() {
        Id accountId = getAccount().Id;
        
        // Get a list of titans that are in the curriculum assigned to the current Account.
        List<Titan__c> titans = [SELECT Name FROM Titan__c
                                 WHERE Curriculum__c IN (SELECT Curriculum__c FROM Account WHERE Id=:accountId)];
        
        List<Id> titanIds = new List<Id>();
        for (Titan__c titan : titans) {
            titanIds.add(titan.Id);
        }
        // For every titan, get the current Account's average scores
        List<AggregateResult> avgScores = [SELECT AVG(Score__c) AvgScore, Exam__r.Titan__c Id FROM Exam_Result__c
                                           WHERE Exam__r.Titan__c=:titanIds  AND Account__c=:accountId 
                                           GROUP BY Exam__r.Titan__c];
        
        // Combine the average score information with the titan score
        List<Map<String, Object>> titansAndAvgScores = Utils.combineByIds(titans, avgScores);
        
        return titansAndAvgScores;
    }
    
}