/////////////////////////////////////////////////////
//
//  Name: NewProjectCreationAuraController
//  Author: Steven Magnin
//  Description: Controller for the NewProjectCreation aura component
//
///////////////////////////////////////////////////

public with sharing class NewProjectCreationAuraController {

    // test comment
    
//test comment here

    //Retrieve list of project names, if any exist.
    // Conversion to LWC note: this function is no longer used.  Was only used with Aura.
    // Now "projectNameIsAvailable" is used instead.
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
    
    @AuraEnabled
    public static Boolean projectNameIsAvailable(String name) {
        List<Project__c> projects = [SELECT Id FROM Project__c WHERE Name = :name];
        return projects.size() == 0;
    }
    
    //Get name and description from JS controller, assign to Project__c object, then insert.
    @AuraEnabled
    public static void setNewProject(String name, String description) {
        try {
            if(NewProjectCreationAuraController.projectNameIsAvailable(name)){
                Project__c newProject = new Project__c();
                newProject.Name = name;
                newProject.Description__c = description;
                insert newProject;
            } else {
                throw new AuraHandledException('Project Name already exists. Please select another name.');
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
}
