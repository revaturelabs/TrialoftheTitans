/////////////////////////////////////////////////////
//
//  Name: ExperienceTriggerHandler
//  Author: Will Harris
//  Created: 9/13/2021
//  Updated: 9//2021
//  Description: Ensures that experiences created have a user id.
//  
///////////////////////////////////////////////////
public with sharing class ExperienceTriggerHandler {
    
    public static void checkUser(List<Experience__c> experiences){
        for(Experience__c experience : experiences){
            if(experience.User__c == null){
                experience.User__c = UserInfo.getUserId();
            }
        }
    }
}