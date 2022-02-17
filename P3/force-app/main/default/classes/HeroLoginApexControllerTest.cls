/**
 * Last Updated: 9-8-2021 by Tylar Harmon
 * Description: Ensures that the HeroLoginApexController works as expected
 */

@isTest
public class HeroLoginApexControllerTest {
    
    @isTest
    static void testPositiveRunScheduler(){
        // Test setup.
        String user = 'not a user';
        String cron = '0 0 0 ? * *';
        String jobName = 'jobname';
        
        // Test that the method runScheduler correctly runs and sends back the String 'Job "jobName" has been scheduled'.
        test.startTest();
        String passTest = HeroLoginApexController.runScheduler(user, cron, jobName);
        test.stopTest();
        
        // Verify tests were successful.
        // In this case, we expect it to be successful because the parameters entered, including the Cron expression, are all valid.
        System.assertEquals('Job "jobname" has been scheduled', passTest);
    }
    @isTest
    static void testNegativeRunScheduler(){
        // Test setup
        String user = 'not a user';
        String cron = 'cron';
        String jobName = 'jobname';
        
       
        // Test that the method runScheduler doesn't run and sends back an exception, 'Illegal characters for this position: 'CRO', since the Cron expression is not
        // valid.
        test.startTest();
        String failedTest = HeroLoginApexController.runScheduler(user, cron, jobName);
        test.stopTest();
        
        // Verify tests were successful
        // In this case, we expect it to be successful because the parameters entered, the cron expression particularly, were not valid.
        System.assertEquals('Illegal characters for this position: \'CRO\'', failedTest);

        

        
    }
    
}