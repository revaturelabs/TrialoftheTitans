@isTest
public class HeroLoginApexControllerTest {
    
    @isTest
    static void testRunScheduler(){
        
        test.startTest();
        HeroLoginApexController.runScheduler('not a user', 'cron', 'jobname');
        HeroLoginApexController.runScheduler('not a user', '0 0 0 ? * *', 'jobname');
        test.stopTest();
    }

}