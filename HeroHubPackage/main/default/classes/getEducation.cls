public with sharing class getEducation {
    @AuraEnabled(cacheable=true)
    public static List<Education__c> getSchools() {
        //Returns all of the Schools from the database for the user
        return [SELECT Image_URL__c, DateGraduate__c, Degree__c, Gpa__c, Major__c, School__c FROM Education__c];

    }
}