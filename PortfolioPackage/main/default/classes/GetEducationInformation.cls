//Mohammed Azad
//Returns a list of the education object based on the user
public with sharing class GetEducationInformation {
    @AuraEnabled(cacheable=true)
    public static List<Education__c> returnEducationList() { 
        id userIdHolder = UserInfo.getUserId();
    	List <Education__c> EducationList = [SELECT Name, Degree__c, Gpa__c, Major__c,DateGraduate__c FROM Education__c WHERE  User__c =: userIdHolder];
        return EducationList;
    }
}
