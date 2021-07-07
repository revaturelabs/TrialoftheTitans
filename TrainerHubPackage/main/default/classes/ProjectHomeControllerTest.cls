@isTest
public class ProjectHomeControllerTest {

    @testSetup static void setup() {
        // Create common test accounts
        List<Project__c> testAccts = new List<Project__c>();
        for(Integer i=0 ; i < 2; i++) {
            Project__c project =  new Project__c(Name = 'Test ${i} ');
            project.Description__c = 'description ${i}';
        }
        insert testAccts;        
    }
}