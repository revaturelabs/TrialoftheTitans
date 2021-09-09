/////////////////////////////////////////////////////
//
//  Name: ExperiencesController
//  Author: Will Harris
//  Created: 9/8/2021
//  Updated: 9//2021
//  Description: ExperiencesController allows for the 
//  other experiences component to communicate with the
//  database.
//  
///////////////////////////////////////////////////
public with sharing class ExperiencesController {

    /*getExperiences() queries a list of experiences based on the user invoking it.
    userId: id of the user invoking the method. */
    @AuraEnabled
    public static List<Experience__c> getExperiences(Id userId){
        User currentUser = [SELECT Id, ContactId FROM User WHERE Id = :userId LIMIT 1];
        Contact contact = [SELECT Id, AccountId FROM Contact WHERE Id = :currentUser.ContactId LIMIT 1];

        List<Experience__c> experiences = new List<Experience__c>();

        /*for(Integer i = 0; i < 6; i++){
            experiences.add(new Experience__c(
                Account__c= contact.AccountId,
                Company__c='Test Company ' + i,
                Position__c='Tester',
                Start_Date__c= Date.valueOf('2011-11-11'),
                End_Date__c= Date.today()
            ));
        }*/
        
        experiences = [SELECT Id, Company__c, Position__c, Start_Date__c, End_Date__c 
                                        FROM Experience__c
                                        WHERE Id = :contact.AccountId];

        return experiences;

    }
}
