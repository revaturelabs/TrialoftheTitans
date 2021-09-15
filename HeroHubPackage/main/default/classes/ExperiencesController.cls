/////////////////////////////////////////////////////
//
//  Name: ExperiencesController
//  Author: Will Harris
//  Created: 9/8/2021
//  Updated: 9/14/2021
//  Description: ExperiencesController allows for the 
//  other experiences component to communicate with the
//  database.
//  
///////////////////////////////////////////////////
public with sharing class ExperiencesController {

    /*getExperiences() queries a list of experiences based on the user invoking it.
    userId: id of the user invoking the method. Parameter is passed on from JavaScript helper */
    @AuraEnabled
    public static List<Experience__c> getExperiences(){
        List<Experience__c> experiences = new List<Experience__c>();

        String curUser = UserInfo.getUserId();

        experiences = [SELECT Id, Company__c, Position__c, Start_Date__c, End_Date__c 
                                FROM Experience__c
                                WHERE User__r.Id = :curUser];

        //There could possibly be cases for when we are returning null experiences.
        //So some functionaility to throw exceptions or errors in those cases, maybe.

        return experiences;

    }

    /*updateExperiences() updates experiences in the database
    experiences: experiences to update*/
    @AuraEnabled
    public static void updateExperiences(List<Experience__c> experiences){
        if(experiences != null){
            update experiences;
        }
    }

    /*deleteExperience() deletes experiences in the database
    experiences: experiences to delete */
    @AuraEnabled
    public static void deleteExperience(Experience__c experience){
        delete experience;
    }
}
