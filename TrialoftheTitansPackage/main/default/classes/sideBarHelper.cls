public with sharing class sideBarHelper {
    public static Contact getContact() {
        User user = [SELECT ContactId, ProfileId FROM User WHERE Id=:UserInfo.getUserId()];
        PermissionSet sysAdminProfile = [SELECT Profile.Id FROM PermissionSet WHERE Profile.Name='System Administrator' AND isCustom=false];
        Contact contact;
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
        User user = [SELECT Id FROM User WHERE ContactId=:contact.Id];
        List<Certification__c> certList = [SELECT Assessor__c, Date_Issued__c, Image_URL__c, User__c, Verification_Site__c,Name FROM Certification__c WHERE User__c=:user.Id];
        return certList;
    }
    @AuraEnabled(cacheable=true)
    public static List<Education__c> getPortfolioStatus() {
        Contact contact = getContact();
        User user = [SELECT Id FROM User WHERE ContactId=:contact.Id];
        List<Education__c> statList = [SELECT Portfolio_Status__C,Id,Name FROM Education__c WHERE User__c=:user.Id];
        return statList;
    }

    @AuraEnabled(cacheable=true)
    public static List<Map<String, Object>> getAvgScorePerTitan() {
        Id accountId = getAccount().Id;
        
        // Get a list of titans that are in the curriculum assigned to the current Account.
        List<Titan__c> titans = [SELECT Name, Series__c FROM Titan__c
                                            WHERE Curriculum__c IN (SELECT Curriculum__c FROM Account WHERE Id=:accountId)
                                            ORDER By Series__c ASC];
        
        List<Id> titanIds = new List<Id>();
        for (Titan__c titan : titans) {
            titanIds.add(titan.Id);
        }
        // For every titan, get the current Account's average scores
        List<AggregateResult> avgScores = [SELECT AVG(Score__c) AvgScore, Exam__r.Titan__c Id FROM Exam_Result__c
                                           WHERE Exam__r.Titan__c=:titanIds  AND Account__c=:accountId 
                                           GROUP BY Exam__r.Titan__c];
        
        // Combine the average score information with the titan score
        List<Map<String, Object>> titansAndAvgScores = combineByIds(titans, avgScores);

        return titansAndAvgScores;
    }
    
    // Combine listB into listA by Id, therefore listA must be larger than or equal in size to listB
    public static List<Map<String, Object>> combineByIds(List<sObject> listA, List<sObject> listB) {
        List<Map<String, Object>> combinedMaps = new List<Map<String, Object>>();
        for (sObject a : listA) {
            Map<String, Object> combinedMap = new Map<String, Object>();
            Map<String, Object> mapA = a.getPopulatedFieldsAsMap();
            combinedMap.putAll(mapA);
            for (sObject b: listB) {
                if (b.Id == a.Id) {
                    Map<String, Object> mapB = b.getPopulatedFieldsAsMap();
                    combinedMap.putAll(mapB);
                    
                    break;
                }
            }
            combinedMaps.add(combinedMap);
        }
        return combinedMaps;
    }
}
