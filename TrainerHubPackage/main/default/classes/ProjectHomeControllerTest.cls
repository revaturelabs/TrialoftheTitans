@isTest
public class ProjectHomeControllerTest {
    
    @testSetup static void setup() {
        // Create common test accounts
        List<Project__c> testObjects = new List<Project__c>();
        for(Integer i=0 ; i < 2; i++) {
            Project__c project =  new Project__c(Name = 'Test ' + i);
            project.Description__c = 'description ' + i;
        }
        insert testObjects;        
    }
    
    @isTest static void testRetrieve(){

        List<Project__c> projects = ProjectHomeController.retrieveProjects();
        for(Project__c pro : projects){
            system.debug(pro.Name);
        }
		system.debug(projects.size());
    }
}