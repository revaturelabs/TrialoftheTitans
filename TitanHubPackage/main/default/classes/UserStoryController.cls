public without sharing class UserStoryController {
    @AuraEnabled(cacheable=true)
    public static List<User_Story__c> getUserStories(ID projectId) {
        return [SELECT Name, Description__c, Github__c, Wireframe__c, Video__c 
                FROM User_Story__c WHERE Project__r.Id = :projectId];
    }

    @AuraEnabled(cacheable=true)
    public static Project__c getProjectInfo(ID titanId){
       return [SELECT Name, Id FROM Project__c WHERE Titan__r.Id = :titanId LIMIT 1];
    }
}