@isTest
public class ProjectHomeControllerTest {
    @testSetup public static void setup() {
        // Create common test accounts
        List<Project__c> testObjects = new List<Project__c>();
        for(Integer index = 0 ; index < 3; index++) {
            Project__c project =  new Project__c();
            project.Name = 'test ' + index;
            project.Description__c = 'description ' + index;
            testObjects.add(project);
        }
        system.debug('laurent');
        insert testObjects;        
    }
    
    
    @isTest public static void retrieveProjects(){
        Test.startTest();
        List<Project__c> projects = ProjectHomeController.retrieveProjects();
        Test.stopTest();
        system.assertEquals(projects.size(), 3);
        
    }
}