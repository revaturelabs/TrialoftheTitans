@IsTest
private class HeroOneOnOneControllerTest {
    @TestSetup
    static void makeData(){
        Account a = new Account(Name='Perseus Eurymedon');
        insert a;
        One_On_One__c testHero = new One_On_One__c(Hero__c = a.id, Week__c = '2', 	Professionalism__c = 6, 
                                                   Soft_Skill_Confidence__c = 8, Soft_Skill_Fluency__c	= 7, Technical_Accuracy__c = 8,
                                                  Technical_Fluency__c = 7, Internal_Comments__c = 'Bad', Personal_Comments__c = 'Bene');
        insert testHero;
    }
    @IsTest
    public static void HeroOneOnOneControllerTest() { 
        test.startTest();
        Account a = [SELECT Id FROM Account WHERE Name = 'Perseus Eurymedon' LIMIT 1];

        Contact c = new Contact(lastname='Fake', firstname='Definitely', AccountId=a.Id);
        insert c;
        Profile p = [SELECT Id FROM Profile WHERE Name='Customer Community User'];
        User u = new User(Alias = 'faker', Email='fakeUser@testorg.com', 
            EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US', 
            LocaleSidKey='en_US', ProfileId = p.Id, 
            TimeZoneSidKey='America/Los_Angeles', UserName='fakeUser@testorg.com',
            ContactId = c.id);
        insert u;


        One_On_One__c testQuery = HeroOneOnOneController.getOneOnOneId(u.Id, '2');
        test.stopTest();
		String testId = testQuery.Id;
        
        System.assertEquals(testId, testQuery.Id);
        System.assertNotEquals('a0T5f000000FDtTEAW', testQuery.Id);
    }
}