@isTest
public class NewProjectCreationAuraControllerTest {
    
    @TestSetup
    static void makeData(){
        
        List<Project__c> projList = new List<Project__c>();
        for(Integer i = 0; i < 10; i++) {

            Project__c testProject = new Project__c();
            testProject.Name = 'Test Project ' + i;
            testProject.Description__c = 'Test Project ' + i + ' Description';
            projList.add(testProject);

        }
        insert projList;

    }

    @isTest
    static void getListTest() {

        String nameList = NewProjectCreationAuraController.getListOfProjectNames();
        List<String> deSerializedNameList = (List<String>)JSON.deserialize(nameList, List<String>.class);
        System.assertEquals('Test Project 0', deSerializedNameList[0]);
        System.assertNotEquals('Test Project 2', deSerializedNameList[1]);

    }

    @isTest
    static void setProjectTest() {

        Integer count = 0;
        String name = 'Test Project 11';
        String description = 'Test Project 11 Description';

        NewProjectCreationAuraController.setNewProject(name, description);

        List<Project__c> retrievedProjects = [SELECT Name, Description__c FROM Project__c];
        for(Project__c proj : retrievedProjects) {

            if(proj.Name == name) {

                count++;

            }

        }

        System.assertEquals(1, count);
        System.assertNotEquals(2, count);

    }

    @isTest
    static void setProjectErrorTest() {

        Integer count = 0;
        String name = 'Test Project 9';
        String description = 'Test Project 9 Description';

        try {

        NewProjectCreationAuraController.setNewProject(name, description);

        }catch (Exception e) {

            System.debug(e.getMessage());

        }

        List<Project__c> retrievedProjects = [SELECT Name, Description__c FROM Project__c];
        
        count = retrievedProjects.size();

        System.assertEquals(10, count);
        System.assertNotEquals(11, count);

    }
}
