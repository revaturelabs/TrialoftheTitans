@isTest
private with sharing class ExperiencesConTest {
    
    @TestSetup
    static void makeExperiences(){

        User SysAdmin = [SELECT Id FROM User WHERE Profile.Name='System Administrator' Limit 1];

        Account account;
        System.runAs(SysAdmin){
            account = new Account(Name = 'test name');
        }
        
        Contact contact = new Contact(
            FirstName = 'test',
            LastName = 'name',
            Email = 'testemail123@gmail.com',
            AccountId = account.Id
        );

        insert account;
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

    @isTest
    static void posSingleTest(){

        Id profileId = [SELECT Id FROM Profile WHERE Name ='Hero'].Id;
        Id roleId = [SELECT Id FROM UserRole WHERE Name ='The Man'].Id;
        Id contact = [SELECT Id FROM Contact WHERE LastName = 'name'].Id;

        User testUser;
        
        User SysAdmin = [SELECT Id FROM User WHERE Profile.Name='System Administrator' Limit 1];

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
    
        Test.startTest();
            insert testUser;
        Test.stopTest();

        List<Experience__c> experiences = new List<Experience__c>();

        System.runAs(testUser){
            experiences = ExperiencesController.getExperiences(testUser.Id);
        }

        System.assertEquals(6, experiences.size());
    }
}
