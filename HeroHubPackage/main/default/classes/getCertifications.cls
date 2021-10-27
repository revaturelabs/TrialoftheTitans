/*
    Modified On: 10/26/2021
    Modified By: Iteration VI
    Description: we modified the query by adding "LIMIT 10" because
        we have data factories that populate a great deal of records,
        and because not all of the records need to be shown on the
        Experience site.
*/

public with sharing class getCertifications {
    @AuraEnabled(cacheable=true)
    public static List<Certification__c> Certifications() {
        //Returns all of the Certifications from the database for the user
        return [SELECT Assessor__c, Name,Id, Verification_Site__c, Date_Issued__c, Image_URL__c FROM Certification__c LIMIT 10];
    }
}