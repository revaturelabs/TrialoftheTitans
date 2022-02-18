@isTest
public class PortfolioProjectControllerTest {
    

    
    @isTest
    static void positiveTests(){
        List<Project__c> projects = new List<Project__c>();
        Id testId = UserInfo.getUserId();
        
        Project__c a = new Project__c(Name='test project', Description__c='test description', 
                                      Roles_Responsibilities__c='test roles', Technologies__c='test tech',
                                      User__c=testId);

        
        projects.add(a);
        
        
        insert projects;
        
        List<Project__c> testget = new List<Project__c>();
        String testupsert = '';
        
        Test.startTest();
        testget = PortfolioProjectController.getProjects(testId);
        testupsert = PortfolioProjectController.createProject(a, false);
        Test.stopTest();
        
        System.assertEquals(1, testget.size());
        System.assertEquals(18, testupsert.length());
        
    }
    
    @isTest
    static void bulkTests(){
        List<Project__c> projects = new List<Project__c>();
        Id testId = UserInfo.getUserId();
        
        for(Integer i = 0; i < 200; i++){
        	Project__c b = new Project__c(Name='test project' + i, Description__c='test description', 
                                      Roles_Responsibilities__c='test roles', Technologies__c='test tech',
                                      User__c=testId);
            projects.add(b);
        }
        
        insert projects;
        
        List<Project__c> testget = new List<Project__c>();
        String testupsert = '';
        
        Test.startTest();
        testget = PortfolioProjectController.getProjects(testId);
        testupsert = PortfolioProjectController.createProject(projects[0], false);
        Test.stopTest();
        
        System.assertEquals(200, testget.size());
        System.assertEquals(18, testupsert.length());
  
    }

}