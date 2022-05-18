public without sharing class UserInfoReadOnlyHelper {
    @AuraEnabled(cacheable=true)
    public static User getBasicUserInfo(Id uid) {

        return [
            SELECT Id,Name,FullPhotoUrl 
            FROM User
            WHERE Id =: uid 
            LIMIT 1
        ][0];
    }

    @AuraEnabled(cacheable=true)
    public static List<Certification__c> getCertifications(Id uid) {

        // Relevant feilds:
        //      Assessor__c
        //      Candidate__r.Name  (Contact)
        //      Certification_Exam__r.Name  (Certification_Exam__c)
        //      Date_Issued__c
        //      Image_URL__c
        //      User__c  (User.Id)


        return [
            SELECT Id,Date_Issued__c,Name,List_Label__c 
            FROM Certification__c
            WHERE User__c =: uid
        ];
    }

    @AuraEnabled(cacheable=true)
    public static Curriculum__c getTechInfo(ID uid){
        
        User conObj = [SELECT name,ContactId,Id FROM User WHERE Id=: uid LIMIT 1];
        id conId = conObj.ContactId;
        Contact accObj = [SELECT name,AccountId,Id FROM Contact WHERE Id=: conId LIMIT 1];
        id accId = accObj.AccountId;
        Account curObj = [SELECT name,Curriculum__c,Id FROM Account WHERE Id=: accId LIMIT 1];
        id curId = curObj.Curriculum__c;
        return [ SELECT name,Technology__c,Id FROM Curriculum__c WHERE Id=: curId LIMIT 1];

    }

    @AuraEnabled(cacheable=true) 
    public static List<About_Me_Record__c> getAboutMeRecord(Id uid){
                            
        List<About_Me_Record__c> aboutMeRecord = new List<About_Me_Record__c>();
        
        aboutMeRecord = [SELECT  About_Me__c, User__c  //Add User__c
                         FROM About_Me_Record__c 
                         WHERE User__c = :uid
                        ];
             
             return aboutMeRecord;
         }
}
