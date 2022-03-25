//Mohammed Azad
//Returns a list of the employment object based on the user
public with sharing class GetExperienceInformation {
    @AuraEnabled(cacheable=true)
    public static List<Experience__c> returnExperienceList() { 
        id userIdHolder = UserInfo.getUserId();
    	List <Experience__c> ExperienceList = [SELECT Company__c, Position__c, Start_Date__c, End_Date__c FROM Experience__c WHERE  User__c =: userIdHolder];
        return ExperienceList;
    }
}
