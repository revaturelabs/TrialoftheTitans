public with sharing class getCertifications {
    @AuraEnabled(cacheable=true)
    public static List<Certification__c> Certifications() {
        //Returns all of the Certifications from the database for the user
        return [SELECT Assessor__c, Name, Verification_Site__c, Date_Issued__c, Image_URL__c FROM Certification__c];
    }
}