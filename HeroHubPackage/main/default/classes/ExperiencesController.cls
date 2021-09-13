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
    userId: id of the user invoking the method. Parameter is passed on from JavaScript helper */
    @AuraEnabled
    public static List<Experience__c> getExperiences(Id userId){
        List<Experience__c> experiences = new List<Experience__c>();

        List<User> currentUser = [SELECT Id, ContactId FROM User WHERE Id = :userId LIMIT 1];
        Id currentId = currentUser.size() > 0 ? currentUser[0].ContactId : null;
        List<Contact> contact = [SELECT Id, AccountId FROM Contact WHERE Id = :currentId LIMIT 1];

        if(currentId != null && contact.size() > 0){
            Id accountId = contact[0].AccountId;

            experiences = [SELECT Id, Company__c, Position__c, Start_Date__c, End_Date__c 
                                FROM Experience__c
                                WHERE Account__c = :accountId];
        }
        else{
            /*Hard-coded nastiness. Created so that there are experiences visible within component
            when opened through an application in developer console. Otherwise, there is no user id, therefore
            nothing to query for experiences. */
            for(Integer i = 0; i < 6; i++){
                experiences.add(new Experience__c(
                    Account__c='0015f000003Tnr4AAC',
                    Company__c='Test Company ' + i,
                    Position__c='Tester',
                    Start_Date__c= Date.valueOf('2011-11-11'),
                    End_Date__c= Date.today()
                ));
            }
        }

        return experiences;

    }
}