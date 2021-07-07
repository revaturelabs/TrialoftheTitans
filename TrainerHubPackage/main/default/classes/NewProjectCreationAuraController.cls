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
            Boolean matchFound = false;
            Project__c newProject = new Project__c();
            List<Project__c> projectList = [SELECT Name FROM Project__c];

            newProject.Name = name;
            newProject.Description__c = description;

            for(Project__c proj : projectList) {
                if(proj.Name == name) {
                    matchFound = true;
                    throw new AuraHandledException('Project Name already exists. Please select another name.');
                }

            }

            if(matchFound == false){
                insert newProject;
            }

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }

    }

}
