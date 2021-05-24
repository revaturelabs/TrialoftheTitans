@isTest
public class HeroHubUtilitiesTest {
    
    @TestSetup
    static void testSetup(){
    
        Account customerAccount = new Account();
        customerAccount.Name ='Customer';
        
        Database.insert(customerAccount);

        Contact customerContact = new Contact();
        customerContact.LastName = 'test';
        customerContact.AccountId = customerAccount.Id;
        
        Database.insert(customerContact);
        
        Id customerProfileId = [SELECT id FROM Profile WHERE name='Customer Community Login' LIMIT 1].id;
        Id customerRoleId = [SELECT Id FROM UserRole WHERE PortalType = 'None' LIMIT 1].id;
        
        User customerUser = new User(
            ProfileId = customerProfileId,
            Username = System.now().millisecond() + 'test42@test.com',
            Alias = 'Hath',
            Email='Hath.Annaway@mgail.com',
            EmailEncodingKey='UTF-8',
            Firstname='Hath',
            Lastname='Annaway',
            LanguageLocaleKey='en_US',
            LocaleSidKey='en_US',
            TimeZoneSidKey='America/Chicago',
            ContactId = customerContact.id
        );
        
        Database.insert(customerUser);
    }

    @isTest
    static void getAccountReturnsAccount(){
		Id accountId = [SELECT id FROM ACCOUNT WHERE NAME='Customer'].Id;
        User customerUser = [SELECT id, name FROM User WHERE alias='Hath'];
        System.runAs(customerUser){
           Account customerAccountId = HeroHubUtilities.getUserAccount();
           System.assertEquals(accountId, customerAccountId);
        }  
    }
}
