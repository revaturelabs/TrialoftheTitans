@IsTest
public class TrainerOneOnOneControllerTest {
    @TestSetup
    static void makeData(){
        One_On_One__c testTrainer = new One_On_One__c(Hero__c = '0015f000004Te76AAC', Week__c = '2', 	Professionalism__c = 6, 
                                                   Soft_Skill_Confidence__c = 8, Soft_Skill_Fluency__c	= 7, Technical_Accuracy__c = 8,
                                                  Technical_Fluency__c = 7, Internal_Comments__c = 'Bad', Personal_Comments__c = 'Bene');
        insert testTrainer;
    }
    @IsTest
    public static void HeroOneOnOneControllerTest() { 
        test.startTest();
        One_On_One__c testQuery = HeroOneOnOneController.getOneOnOneId('0015f000004Te76AAC', '2');
        test.stopTest();
		String testId = testQuery.Id;
        
        System.assertEquals(testId, testQuery.Id);
        System.assertNotEquals('a0T5f000000FDtTEAW', testQuery.Id);
    }
}
