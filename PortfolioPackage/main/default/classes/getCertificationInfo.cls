public with sharing class getCertificationInfo {
    @AuraEnabled(cacheable=true)
   public static List<Certification__c> Certifications() {
        Id userIdHolder = UserInfo.getUserId();

       //Returns all of the Certifications from the database for the user
      List<Certification__c> cer= [SELECT Assessor__c, Name,Id, Verification_Site__c, Date_Issued__c, Image_URL__c FROM Certification__c WHERE  User__c =: userIdHolder];
       return cer;
   }

}