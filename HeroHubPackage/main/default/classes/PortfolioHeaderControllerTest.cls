@isTest
public class PortfolioHeaderControllerTest {
      
    PortfolioHeaderControllerTest() {
        
    }

    @TestSetup
    static void makeData(){
        
        id UserId = UserInfo.getUserId();
        database.insert(new Job__c(Name = 'Stuff', User__c = UserId));
        

    }
    
    @isTest
    public static void controllerTest(){
        String output = PortfolioHeaderController.getUserName();
        System.assertNotEquals(null, output);
    }

    @isTest
    public static void getJobTest(){
        id UserId = UserInfo.getUserId();
        String output = PortfolioHeaderController.getJob();
        System.assertEquals('Stuff', output);
    }
    
    @isTest
    public static void setJobTest(){
        id UserId = UserInfo.getUserId();
        String input = 'new job';
        PortfolioHeaderController.setJob(input);
        List<Job__c> jobs = [SELECT Name FROM Job__c WHERE User__c = :UserId];
        System.assertEquals('new job', jobs[0].Name);
    }

}