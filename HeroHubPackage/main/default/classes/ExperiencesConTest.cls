@isTest
private with sharing class ExperiencesConTest {
    
    @TestSetup
    static void makeExperiences(){
        User SysAdmin = [SELECT Id FROM User WHERE Profile.Name='System Administrator' Limit 1];
        Account account;
        
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
    Other Experiences. */
    private static User createExperienceCloudUser(){
        Id profileId = [SELECT Id FROM Profile WHERE Name ='Hero'].Id;
        Id contact = [SELECT Id FROM Contact WHERE LastName = 'name'].Id;

        User testUser;
        
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
        
        System.assertEquals(200, experiences.size());
    }

    @isTest
    static void negTest(){
        Id testUser = null;

        List<Experience__c> experiences = ExperiencesController.getExperiences(testUser);

        System.assertEquals(6, experiences.size());
    }
}
