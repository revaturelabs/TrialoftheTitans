public without sharing class TitanPageApexController {
    public TitanPageApexController() {
    }

    @AuraEnabled
    public static User fetchUser() {
        //Method for retrieving Current User information
        User oUser = [SELECT id,FirstName,LastName FROM User WHERE id =:UserInfo.getUserId()];
        return oUser; 
    }

    @AuraEnabled
    public static List<Titan__c> getTitans() {
        //Method for retrieving list of titans
        List<Titan__c> titanList = [SELECT Name FROM Titan__c];
        return titanList;
    }


    @AuraEnabled
    public static List<Skill__c> getSkills() {
        //Method for retrieving list of associated skills
        List<Skill__c> skillsList = [SELECT Name FROM Skill__c];
        return skillsList; 
    }

    
}