/////////////////////////////////////////////////////
//
//  Name: ExperiencesContTest
//  Author: Will Harris
//  Created: 9/8/2021
//  Updated: 9//2021
//  Description: Unit Tests for ExperiencesController
//  
///////////////////////////////////////////////////
@isTest
private with sharing class ExperiencesConTest {
    
    @TestSetup
    static void makeExperiences(){
        //Query for a user that's a System Admin
        User SysAdmin = [SELECT Id FROM User WHERE Profile.Name='System Administrator' Limit 1];
        Account account;
        
        //Create account for Experience Cloud User
        //Important! Account needs to be made by a user with a role
        //in order to create an experience cloud user.
        System.runAs(SysAdmin){
            account = new Account(Name = 'test name');
            insert account;
        }
        
        Contact contact = new Contact(
            FirstName = 'test',
            LastName = 'name',
            Email = 'testemail123@gmail.com',
            AccountId = account.Id
        );

        insert contact;

        //Create six experiences
        List<Experience__c> experiences = new List<Experience__c>();

        
    }

    /*createExperienceCloudUser() creates an Experience Cloud User to test the functionaility of
    Other Experiences. Kept separate from TestSetup because you cannot create a user in the same context you 
    create an account or contact, and vice versa.*/
    private static User createExperienceCloudUser(){
        Id profileId = [SELECT Id FROM Profile WHERE Name ='Hero'].Id;
        Id contact = [SELECT Id FROM Contact WHERE LastName = 'name'].Id;

        User testUser;
        
        //You must create an experience cloud user as a System Admin. Otherwise, the compiler
        //will hate you
        User SysAdmin = [SELECT Id FROM User WHERE Profile.Name='System Administrator' Limit 1];

        System.runAs(SysAdmin){
            testUser = new User(
                FirstName = 'TestUser',
                LastName = '1',
                Email = 'testemail123@gmail.com',
                EmailEncodingKey = 'ISO-8859-1',  
                Username = 'testemail123@gmail.com',
                Alias = 'TestUser',
                TimeZoneSidKey = 'America/Los_Angeles',  
                LocaleSidKey = 'en_US',  
                LanguageLocaleKey = 'en_US', 
                ProfileId = profileId
            );

            testUser.ContactId = contact;
        
            insert testUser;
        }
        return testUser;

    }

    @isTest
    static void posSingleTest(){
        User testUser = createExperienceCloudUser();

        List<Experience__c> experiences = new List<Experience__c>();
        
        Contact contact = [SELECT Id, AccountId FROM Contact WHERE Email = 'testemail123@gmail.com'];

        Account account = [SELECT Id FROM Account WHERE Name = 'test name'];

        for(Integer i = 0; i < 6; i++){
            experiences.add(new Experience__c(
                //Account__c= account.Id,
                User__c = testUser.Id,
                Company__c='Test Company ' + i,
                Position__c='Tester',
                Start_Date__c= Date.valueOf('2011-11-11'),
                End_Date__c= Date.today()
            ));
        }

        insert experiences;

        experiences = null;
        
        System.runAs(testUser){
            experiences = ExperiencesController.getExperiences();
        }
        
        //Size of experiences should be six
        System.assertEquals(6, experiences.size());


        //Test updateExperiences() method
        for(Experience__c experience : experiences){
            experience.Start_Date__c = Date.valueOf('2012-12-12');
        }

        System.runAs(testUser){
            ExperiencesController.updateExperiences(experiences);
        }

        for(Experience__c experience : experiences){
            System.assertEquals(Date.valueOf('2012-12-12'), experience.Start_Date__c);
        }
        
        //Test deleteExperience() method
        ExperiencesController.deleteExperience(experiences[5]);

        System.runAs(testUser){
            experiences = ExperiencesController.getExperiences();
        }

        System.assertEquals(5, experiences.size());
    }

    @isTest
    static void posBulkTest(){
        List<Experience__c> experiences = new List<Experience__c>();

        Contact contact = [SELECT Id, AccountId FROM Contact WHERE Email = 'testemail123@gmail.com'];

        Account account = [SELECT Id FROM Account WHERE Name = 'test name'];

        User testUser = createExperienceCloudUser();

        //large number of experiences for bulk test
        for(Integer i = 0; i < 200; i++){
            experiences.add(new Experience__c(
                //Account__c= account.Id,
                User__c = testUser.Id,
                Company__c='Test Company ' + i,
                Position__c='Tester',
                Start_Date__c= Date.valueOf('2011-11-11'),
                End_Date__c= Date.today()
            ));
        }

        Test.startTest();
            insert experiences;
        Test.stopTest();

        experiences = null;

        
        System.runAs(testUser){
            experiences = ExperiencesController.getExperiences();
        }
        
        //Size of experiences should be 200 here.
        System.assertEquals(200, experiences.size());
    }
}
