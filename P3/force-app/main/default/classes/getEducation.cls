/*
    Modified On: 10/26/2021
    Modified By: Iteration VI
    Description: we modified the query by adding "LIMIT 3" because
        we have data factories that populate a great deal of records,
        and because not all of the records need to be shown on the
        Experience site.
*/

public with sharing class getEducation {
    @AuraEnabled(cacheable=true)
    public static List<Education__c> getSchools() {
        //Returns all of the Schools from the database for the user
        return [SELECT Name, Image_URL__c, DateGraduate__c, Degree__c, Gpa__c, Major__c FROM Education__c LIMIT 3];

    }
}