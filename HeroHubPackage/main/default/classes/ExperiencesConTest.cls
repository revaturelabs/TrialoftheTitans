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

        for(Integer i = 0; i < 6; i++){
            experiences.add(new Experience__c(
                Account__c= account.Id,
                Company__c='Test Company ' + i,
                Position__c='Tester',
                Start_Date__c= Date.valueOf('2011-11-11'),
                End_Date__c= Date.today()
            ));
        }

        insert experiences;
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
        
        experiences = ExperiencesController.getExperiences(testUser.Id);
        
        //Size of experiences should be six
        System.assertEquals(6, experiences.size());
    }

    @isTest
    static void posBulkTest(){
        List<Experience__c> experiences = new List<Experience__c>();

        Contact contact = [SELECT Id, AccountId FROM Contact WHERE Email = 'testemail123@gmail.com'];

        //Create additional experiences to test bulk loading of experiences
        for(Integer i = 6; i < 200; i++){
            experiences.add(new Experience__c(
                Account__c= contact.AccountId,
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

        User testUser = createExperienceCloudUser();
        
        experiences = ExperiencesController.getExperiences(testUser.Id);
        
        //Size of experiences should be 200 here.
        System.assertEquals(200, experiences.size());
    }

    @isTest
    static void negTest(){
        Id testUser = null;

        //Simulate no valid user id, or method ran in system mode
        List<Experience__c> experiences = ExperiencesController.getExperiences(testUser);

        /*Right now, we check for a size of 6 because the only way to
        view component in a system context is to hardcode experiences
        to return. In the future, this may not be needed and we can do something else
        in this negative case. This test for now tests to see if the hardcoded
        case works properly.*/
        System.assertEquals(6, experiences.size());
    }
}
