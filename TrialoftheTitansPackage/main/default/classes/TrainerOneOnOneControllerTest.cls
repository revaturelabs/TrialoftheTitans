@IsTest
public class TrainerOneOnOneControllerTest {
    @TestSetup
    static void makeData(){
        Cohort__c testCohort = new Cohort__c(Name = 'testCohort');
        insert testCohort;
        
        Account testHero = new Account(Name = 'Odysseus', Cohort__c = testCohort.Id);
        Profile p = [SELECT Id FROM Profile WHERE Name='Standard User']; 
        
        User testTrainer = new User(Alias = 'ari', Email='ari@greece.com', 
            EmailEncodingKey='UTF-8', LastName='Plato', LanguageLocaleKey='en_US', 
            LocaleSidKey='en_US', ProfileId = p.Id, 
            TimeZoneSidKey='America/Los_Angeles', UserName='ari@greece.com');
        
        insert testHero;
        insert testTrainer;
        
        One_on_One__c testOne = new One_on_One__c(Name = 'test', Hero__c = testHero.Id, Trainer__c = testTrainer.Id, Week__c = '2', Professionalism__c = 6, 
                                                   Soft_Skill_Confidence__c = 8, Soft_Skill_Fluency__c	= 7, Technical_Accuracy__c = 8,
                                                  Technical_Fluency__c = 7, Internal_Comments__c = 'Bad', Personal_Comments__c = 'Bene');
        One_on_One__c testOneNeg = new One_on_One__c(Name = 'test', Hero__c = testHero.Id, Trainer__c = testTrainer.Id, Week__c = '1', Professionalism__c = 6, 
                                                   Soft_Skill_Confidence__c = 8, Soft_Skill_Fluency__c	= 7, Technical_Accuracy__c = 8,
                                                  Technical_Fluency__c = 7, Internal_Comments__c = 'Good', Personal_Comments__c = 'No bene');
		insert testOne;
        insert testOneNeg;
        
        List <One_on_One__c> bulkTest = new List <One_on_One__c>();
        for(Integer t = 0; t < 25; t++){
            One_on_One__c test = new One_on_One__c(Name = 'test ' + t, Hero__c = testHero.Id, Trainer__c = testTrainer.Id, Week__c = '2', Professionalism__c = 6, 
                                    Soft_Skill_Confidence__c = 8, Soft_Skill_Fluency__c	= 7, Technical_Accuracy__c = 8,
                                    Technical_Fluency__c = 7, Internal_Comments__c = 'Bad', Personal_Comments__c = 'No good');
            One_on_One__c testNeg = new One_on_One__c(Name = 'test', Hero__c = testHero.Id, Trainer__c = testTrainer.Id, Week__c = '1', Professionalism__c = 6, 
                                    Soft_Skill_Confidence__c = 8, Soft_Skill_Fluency__c	= 7, Technical_Accuracy__c = 8,
                                    Technical_Fluency__c = 7, Internal_Comments__c = 'Good', Personal_Comments__c = 'No bene');
            bulkTest.add(test);
            bulkTest.add(testNeg);
        }
        insert bulkTest;
    }
    @IsTest
    public static void singleTests() {
        Cohort__c testCohort = [SELECT Name, Id FROM Cohort__c WHERE Name = 'testCohort'];
        User testTrainer = [SELECT Id FROM User WHERE LastName = 'Plato'];
        //positive
        List <One_on_One__c> testQueryList = TrainerOneOnOneController.getOneOnOneId(testTrainer.Id, '2', testCohort.Id);
        One_On_One__c test = testQueryList[0];
		String testId = test.Id;
        System.assertEquals(testId, testQueryList[0].Id);
        //negative
        List <One_on_One__c> testNegList = TrainerOneOnOneController.getOneOnOneId(testTrainer.Id, '1', testCohort.Id);
        One_On_One__c negTest = testNegList[0];
        String testNegId = negTest.Id;
        System.assertNotEquals(negTest.Id, testQueryList[0].Id);
    }
    @IsTest
    public static void bulkTests(){
        User testTrainer = [SELECT Id FROM User WHERE LastName = 'Plato'];
        Cohort__c testCohort = [SELECT Name, Id FROM Cohort__c WHERE Name = 'testCohort'];
        List <One_on_One__c> testQueryListBulk = TrainerOneOnOneController.getOneOnOneId(Id.valueof(testTrainer.Id), '2', Id.valueof(testCohort.Id));
        for(Integer i = 0; i < testQueryListBulk.size(); i++){
           List <One_on_One__c> test = TrainerOneOnOneController.getOneOnOneId(Id.valueof(testTrainer.Id), '2', Id.valueof(testCohort.Id));
           System.assertEquals(testQueryListBulk[i], test[i]);
        }
        for(Integer i = 0; i < testQueryListBulk.size(); i++){
           List <One_on_One__c> testNegative = TrainerOneOnOneController.getOneOnOneId(Id.valueof(testTrainer.Id), '1', Id.valueof(testCohort.Id));
           System.assertNotEquals(testQueryListBulk[i], testNegative[i]);
        }
    }
}