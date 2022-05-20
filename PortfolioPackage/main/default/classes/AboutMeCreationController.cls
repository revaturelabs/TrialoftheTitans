/* Author: Gabriela Conrado
    Description: LWC component that allows you to create an About Me section and edit existing ones. 
    Date Created: 03/21/22
    Modified Date: 03/24/2021
    Iteration XI */

    public with sharing class AboutMeCreationController {

        // This method allows the user to create a new record in the database.
         @AuraEnabled
         public static void createAboutMeSection(String aboutMeRecInput){
             Id userId = UserInfo.getUserId();
             About_Me_Record__c aboutmeRecord= new About_Me_Record__c(About_Me__c = aboutMeRecInput, User__c=userId);
             insert aboutmeRecord;
         
         }

         // This method allows the user to update a record that already exists in the database.
         @AuraEnabled
         public static void updateAboutMeSection(String aboutMeRecInput){
           
             Id userId = UserInfo.getUserId();
             List<About_Me_Record__c> aboutMeRecord = new List<About_Me_Record__c>();
             
             aboutMeRecord = [SELECT  About_Me__c 
                              FROM About_Me_Record__c
                              WHERE User__c = :userId
                             ];

             for(About_Me_Record__c a: aboutMeRecord){
                 a.About_Me__c= aboutMeRecInput;
                 update a;
             }
         }
  
         @AuraEnabled(cacheable=true) 
     public static List<About_Me_Record__c> getAboutMeRecord(){

         Id userId = UserInfo.getUserId();
         List<About_Me_Record__c> aboutMeRecord = new List<About_Me_Record__c>();

         aboutMeRecord = [SELECT  About_Me__c, Id,User__c,Relocation__c,Remote__c //Add User__c
                         FROM About_Me_Record__c
                         WHERE User__c = :userId
                         ];

         return aboutMeRecord;
     }

     @AuraEnabled
     public static void updateRemote(Boolean checked,Boolean checkval){

         Id userId = UserInfo.getUserId();
         List<About_Me_Record__c> remote = new List<About_Me_Record__c>();

         remote = [SELECT  Remote__c, Relocation__c
                          FROM About_Me_Record__c
                          WHERE User__c = :userId
                         ];

         for(About_Me_Record__c a: remote){
             a.Remote__c= checked;
             a.Relocation__c= checkval;
             upsert a;
         }
     }
}