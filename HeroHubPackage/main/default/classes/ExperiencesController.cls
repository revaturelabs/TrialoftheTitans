/////////////////////////////////////////////////////
//
//  Name: ExperiencesController
//  Author: Will Harris, Ethan Wilson
//  Created: 9/8/2021
//  Updated: 10/25/2021
//  Description: ExperiencesController allows for the 
//  other experiences component to communicate with the
//  database. (Edited to work with LWC)
//  
// 
//  Modified On: 10/26/2021
//  Modified By: Iteration VI
//  Description: we modified the query by adding "LIMIT 10" because
//      we have data factories that populate a great deal of records,
//      and because not all of the records need to be shown on the
//      Experience site.
//  
///////////////////////////////////////////////////
public with sharing class ExperiencesController {

    /*getExperiences() queries a list of experiences based on the user invoking it.
    userId: id of the user invoking the method. Parameter is passed on from JavaScript helper 
     -- iteration 6 removed this. idk why they just didn't use with sharing
    */
    @AuraEnabled(cacheable=true)
    public static List<Experience__c> getExperiences(){
        return [SELECT Id, Company__c, Position__c, Start_Date__c, End_Date__c 
                    FROM Experience__c LIMIT 10];

        //There could possibly be cases for when we are returning null experiences.
        //So some functionaility to throw exceptions or errors in those cases, maybe.
    }

    /*updateExperiences() updates experiences in the database
    experiences: experiences to update*/
    @AuraEnabled(cacheable=true)
    public static void updateExperiences(List<Experience__c> experiences){
        if(experiences != null){
            update experiences;
        }
    }

    /*deleteExperience() deletes experiences in the database
    experiences: experiences to delete */
    @AuraEnabled(cacheable=true)
    public static void deleteExperience(Experience__c experience){
        Database.delete(experience);
    }
}
