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
            List<String> noProjectsList = new List<String> {'NullList', 'NullList'};
            String noProjects = JSON.serialize(noProjectsList);
            system.debug(noProjects);
            List<Project__c> projects = [SELECT Name FROM Project__c];

            for(Project__c pro : projects) {
                    projectNames.add(pro.Name);

            }
            system.debug(JSON.serialize(projectNames));

            if(projectNames == null) {
                return noProjects;
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

            Project__c newProject = new Project__c();

            newProject.Name = name;
            newProject.Description__c = description;

            insert newProject;

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }

    }

}
