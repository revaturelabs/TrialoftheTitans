/////////////////////////////////////////////////////
//
//  Name: Public Videos Aura Controller Test
//  Author: Alyssa Reed
//  Description: This class tests the PublicVideosAuraController
//               using positive and negative test and creating
//               mock data using the TestSetup. Specific user testing
//               was also done.
//
////////////////////////////////////////////////////

@isTest
public class PublicVideosAuraControllerTest {
		
    @testSetup
    public static void mytestData(){
        
    Cohort__c mycohort = new Cohort__c(
    Name = '34443'
    );
    insert mycohort;
        
	Account myAccount = new Account(
		Name = 'Marina Flores',
        Cohort__c = mycohort.Id
    ); 
    insert myAccount;
 
    Mock_Interview_Self__c myInterview = new Mock_Interview_Self__c(
        Account__c = myAccount.Id,
    	Public__c = true
    );
    insert myInterview;
    
    Cohort__c mycohort2 = new Cohort__c(
    Name = '12345'
    );
    insert mycohort2;
        
	Account myAccount2 = new Account(
		Name = 'John Buick',
        Cohort__c = mycohort2.Id
    ); 
    insert myAccount2;
 
    Mock_Interview_Self__c myInterview2 = new Mock_Interview_Self__c(
        Account__c = myAccount2.Id,
    	Public__c = true
    );
    insert myInterview2;
    } 
    
    @isTest
    public static void getPublicVideosTest(){
        Test.startTest();
        list<Mock_Interview_Self__c> myvids = PublicVideosAuraController.getPublicVideos();
        String testerName = myvids[0].AccountName__c;
        Test.stopTest();
        system.debug(myvids[0].AccountName__c);
        system.assertEquals('Marina Flores', testerName);
        system.assert(testerName != 'John Buick');
    }
    
    @isTest
    public static void filterByCohortTest(){
        Test.startTest();
        list<Mock_Interview_Self__c> myvids = PublicVideosAuraController.filterByCohort();
        String testerCohort = myvids[0].Cohort__c;
        Test.stopTest();
        system.assertEquals('12345', testerCohort);
        system.assert(testerCohort != '34443');
    }
    
    @isTest
    public static void filterByHeroNameTest(){
        Test.startTest();
        list<Mock_Interview_Self__c> myvids = PublicVideosAuraController.filterByHeroName();
        String accountName2 = myvids[0].AccountName__c;
        Test.stopTest();
        system.assert(accountName2 != 'Marina Flores');
        system.assertEquals('John Buick', accountName2);
    }
    
    @isTest
    public static void userProfileTest(){
        Test.startTest();
        Profile p = [SELECT Id FROM Profile WHERE Name='System Administrator'];
        User myUser = new User(Alias = 'rushmore', Email='mount@newuser.com', 
            EmailEncodingKey='UTF-8', LastName='mount', LanguageLocaleKey='en_US', 
            LocaleSidKey='en_US', ProfileId = p.Id, 
            TimeZoneSidKey='America/Los_Angeles', UserName='newuser@testerorg.com');
        String myPro;
        system.runAs(myUser){
        myPro = PublicVideosAuraController.userProfile();
        }
        Test.stopTest();
        system.assert(myPro != 'Hero');
        system.assertEquals('System Administrator', myPro);
    }
}