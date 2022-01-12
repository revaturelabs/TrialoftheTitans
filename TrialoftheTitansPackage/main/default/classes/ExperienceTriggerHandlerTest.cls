/////////////////////////////////////////////////////
//
//  Name: ExperienceTriggerHandlerTest
//  Author: Will Harris
//  Created: 9/13/2021
//  Updated: 9/14/2021
//  Description: Tests that ExperienceTriggerHandler works as expected
//  
///////////////////////////////////////////////////
@isTest
private with sharing class ExperienceTriggerHandlerTest {
    public ExperienceTriggerHandlerTest() {

    }

    @isTest
    static void posSingleTest(){
        User testUser = [SELECT Id FROM User WHERE Profile.Name='System Administrator' Limit 1];

        Experience__c experience = new Experience__c(
            Company__c='Test Company',
            Position__c='Tester',
            Start_Date__c= Date.valueOf('2011-11-11'),
            End_Date__c= Date.today()
        );

        System.runAs(testUser){
            insert experience;
        }

        Experience__c actualExperience = [SELECT User__c FROM Experience__c WHERE Company__c = 'Test Company' LIMIT 1];

        //experience created should have the same user id in User__c as testUser
        System.assertEquals(testUser.Id, actualExperience.User__c);
    }
}
