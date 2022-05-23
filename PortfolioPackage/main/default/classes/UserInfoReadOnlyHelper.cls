/**
Created by Theodore Moore @Theodore#1829 on Discord


Helper class for Read only Portfolio 
Needs to be combined with the normal one
All components in normal one rely on the user being 
the owner of portfolio, this helper is to prevent it from being seen in that context

*/

public without sharing class UserInfoReadOnlyHelper {
    @AuraEnabled(cacheable=true)
        /**
        Grabs the user info based on input of userID string
    */
    public static User getBasicUserInfo(String uid) {
    Id userID = Id.valueOf(uid.substring(0,18));
        return [
            SELECT Id,FirstName,LastName,FullPhotoUrl 
            FROM User
            WHERE Id =: userID 
            LIMIT 1
        ][0];
    }
    //Grabs certifications based on userID input
    @AuraEnabled(cacheable=true)
    public static List<Certification__c> getCertifications(String uid) {


        Id userID = Id.valueOf(uid.substring(0,18));
        return [
            SELECT Id,Date_Issued__c,Name,List_Label__c 
            FROM Certification__c
            WHERE User__c =: userID
        ];
    }
    //Grabs Technologies based on userID input
    @AuraEnabled(cacheable=true)
    public static Curriculum__c getTechInfo(String uid){
        Id userID = Id.valueOf(uid.substring(0,18));
        User conObj = [SELECT name,ContactId,Id FROM User WHERE Id=: userID LIMIT 1];
        id conId = conObj.ContactId;
        Contact accObj = [SELECT name,AccountId,Id FROM Contact WHERE Id=: conId LIMIT 1];
        id accId = accObj.AccountId;
        Account curObj = [SELECT name,Curriculum__c,Id FROM Account WHERE Id=: accId LIMIT 1];
        id curId = curObj.Curriculum__c;
        return [ SELECT name,Technology__c,Id FROM Curriculum__c WHERE Id=: curId LIMIT 1];

    }
    //grabs about me based on userID record
    @AuraEnabled(cacheable=true) 
    public static List<About_Me_Record__c> getAboutMeRecord(String uid){
        Id userID = Id.valueOf(uid.substring(0,18));

        List<About_Me_Record__c> aboutMeRecord = new List<About_Me_Record__c>();
        
        aboutMeRecord = [SELECT  About_Me__c, User__c  //Add User__c
                         FROM About_Me_Record__c 
                         WHERE User__c = :userID
                        ];
             
             return aboutMeRecord;
         }
}
