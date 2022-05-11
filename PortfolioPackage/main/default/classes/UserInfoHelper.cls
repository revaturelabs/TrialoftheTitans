/** 
 * Created by Sean Whitley 3/16/22
 * cookie-crisp#3847
 * sean.whitley@revature.net
 */

public without sharing class UserInfoHelper {

    // Relevant relationships:
    //  Certifications__r	
    //  Educations__r	    
    //  Equivalencies__r	
    //  Experiences__r	    
    //  Projects__r 
    //  !!!!!!!

    /**
     * Returns info for the currently logged in Hero (User)
     * 
     *      Profile image url, Name, and Id for edit-form
     */
    @AuraEnabled(cacheable=true)
    public static User getBasicUserInfo() {
        Id uid = UserInfo.getUserId();

        return [
            SELECT Id,Name,FullPhotoUrl 
            FROM User 
            WHERE Id =: uid
            LIMIT 1
        ][0];
    }

    @AuraEnabled(cacheable=true)
    public static List<String> getDonutData(User u) {
        Id uid = u.Id;

        Account userAcc = [SELECT Name, UserId FROM Account WHERE UserId = :uid LIMIT 1];

        List<User_Skill__c> userSkills = [SELECT Skill__c, Account__c FROM User_Skill__c WHERE Account__c = :userAcc.Id];
        
        List<String> names = new List<String>();

        for(User_Skill__c skill : userSkills) {
            names.add(skill.Skill__c.Name);
        }

        return names;
    }

    @AuraEnabled(cacheable=true)
    public static List<Certification__c> getCertifications() {

        // Relevant feilds:
        //      Assessor__c
        //      Candidate__r.Name  (Contact)
        //      Certification_Exam__r.Name  (Certification_Exam__c)
        //      Date_Issued__c
        //      Image_URL__c
        //      User__c  (User.Id)

        Id uid = UserInfo.getUserId();

        return [
            SELECT Id,Date_Issued__c,Name,List_Label__c 
            FROM Certification__c
            WHERE User__c =: uid
        ];
    }
}