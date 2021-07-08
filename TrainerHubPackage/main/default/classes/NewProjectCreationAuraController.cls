/////////////////////////////////////////////////////
//
//  Name: NewProjectCreationAuraController
//  Author: Steven Magnin
//  Description: Controller for the NewProjectCreation aura component
//
///////////////////////////////////////////////////

public with sharing class NewProjectCreationAuraController {

    //Retrieve list of project names, if any exist.
    @AuraEnabled
    public static String getListOfProjectNames() {
        try {
            List<String> projectNames = new List<String>();
            List<Project__c> projects = [SELECT Name FROM Project__c ORDER BY Name];

            //Add names from SOQL statement to list.
            for(Project__c pro : projects) {
                    projectNames.add(pro.Name);

            }

            if(projectNames == null) {
                return null;
            }else {
                return JSON.serialize(projectNames);
            }

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }

    }

    //Get name and description from JS controller, assign to Project__c object, then insert.
    @AuraEnabled
    public static void setNewProject(String name, String description) {
        try {
            Integer matchesFound = 0;
            Project__c newProject = new Project__c();
            List<Project__c> projectList = [SELECT Name FROM Project__c];

            newProject.Name = name;
            newProject.Description__c = description;

            //Check names in Project__c records against passed in name from Project Name field.
            for(Project__c proj : projectList) {
                if(proj.Name == name) {
                    matchesFound++;
                    
                }

            }

            //Prevent insert if name match is found.
            if(matchesFound == 0){

                insert newProject;

            }else {

                throw new AuraHandledException('Project Name already exists. Please select another name.');

            }

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }

    }

}
