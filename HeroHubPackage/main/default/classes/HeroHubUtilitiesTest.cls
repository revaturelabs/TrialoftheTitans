public with sharing class HeroHubUtilitiesTest {
    
    @TestSetup
    static void testSetup(){
    
        Account customerAccount = new Account();
        customerAccount.Name ='customer';
        
        Database.insert(customerAccount);
        
        
        
        Database.update(partnerAccount);
        
        Contact partnerContact = new Contact();
        partnerContact.LastName = 'test';
        partnerContact.AccountId = partnerAccount.Id;
        
        Database.insert(partnerContact);
        
        Id partnerProfileId = [SELECT id FROM Profile WHERE name='Asteria Partner' Limit 1].id;
        Id partnerRoleId = [Select Id From UserRole Where PortalType = 'None' Limit 1].id;
        
        User partnerUser = new User(
            ProfileId = partnerProfileId,
            Username = System.now().millisecond() + 'test42@test.com',
            Alias = 'Hath',
            Email='Hath.Annaway@mgail.com',
            EmailEncodingKey='UTF-8',
            Firstname='Hath',
            Lastname='Annaway',
            LanguageLocaleKey='en_US',
            LocaleSidKey='en_US',
            TimeZoneSidKey='America/Chicago',
            ContactId = partnerContact.id
        );
        
        Database.insert(partnerUser);
    }
}
