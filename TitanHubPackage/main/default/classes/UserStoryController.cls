public without sharing class UserStoryController {
    @AuraEnabled(cacheable=true)
    public static List<User_Story__c> getUserStories(ID projectId) {
        return [SELECT Name, Description__c, Github__c, Wireframe__c, Video__c 
                FROM User_Story__c WHERE Project__r.Id = :projectId];
    }
}
