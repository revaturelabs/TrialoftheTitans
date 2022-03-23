/** 
 * Created by Sean Whitley 3/16/22
 * cookie-crisp#3847
 * sean.whitley@revature.net
 */

public with sharing class UserInfoHelper {

    // Relevant relationships:
    //  Certifications__r	
    //  Educations__r	    
    //  Equivalencies__r	
    //  Experiences__r	    
    //  Projects__r 

    /**
     * Returns info for the currently logged in Hero (User)
     * 
     *      Profile image url, Name, and Id for edit-form
     */
    @AuraEnabled(cacheable=true)
    public static User getBasicUserInfo() {
        return [SELECT Id,Name,FullPhotoUrl FROM User LIMIT 1][0];
    }

    @AuraEnabled(cacheable=true)
    public static List<Certification__c> getCertifications() {

        // Relevant feilds:
        //      Assessor__c
        //      Candidate__c
        //      Certification_Exam__c
        //      Date_Issued__c
        //      Image_URL__c

        String uid = UserInfo.getUserId();

        // Danger: this is VERY incomplete
        return [SELECT Id,Name,Assessor__c,Candidate__c FROM Certification__c WHERE User__c =: uid];
    }
}