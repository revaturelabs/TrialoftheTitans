/*
    Written by: David Labib
    Desc: methods for the Project Componnent for the portfolio
    used to retrieve,add,edit and delete projects
    Date Created: 03/25/22
    Last Modified Date: 03/25/2021
    Iteration XI
*/


public without sharing class portfolioProjectHelper {
    //this method gets the latest 3 projects for the logged in user
    @AuraEnabled(cacheable=true)    
    public static List<Project__c> getProjects(){
        //use the builtin UserInfo class to get the id (and other info) about the logged in user
        id uid = UserInfo.getUserId();
        
        //query to get the latest 3 projects related to the logged in user
        List<Project__c> projects = [
            SELECT Id, Name, Role__c, Description__c, Roles_Responsibilities__c
            FROM Project__c
            WHERE User__c = :uid
            ORDER BY CreatedDate DESC
            LIMIT 3
        ];
        System.debug(projects);
        return projects;
    }

    //method returns a list of all projects related to a user
    @AuraEnabled   
    public static List<Project__c> getALLProjects(){
        //use the builtin UserInfo class to get the id (and other info) about the logged in user
        id uid = UserInfo.getUserId();
        
        //query to get ALL projects related to the logged in user
        List<Project__c> projects = [
            SELECT Name, Description__c
            FROM Project__c
            WHERE User__c = :uid
            ORDER BY CreatedDate DESC
        ];
        return projects;
    }

    //this method is used to create a new project for a user
    @AuraEnabled 
    public static void createProjects(String newProjectName){
        //use the builtin UserInfo class to get the id (and other info) about the logged in user
        Id userId = UserInfo.getUserId();
        //make new project record
        Project__c newProjectRec= new Project__c(Name = newProjectName, User__c=userId);
        insert newProjectRec; //insert new project record
    
    }

    //this method is used to update the description field for projects
    //called when the user hits save
    @AuraEnabled
    public static void setProjects(String projectInput, String projectName){
    
        //use the builtin UserInfo class to get the id (and other info) about the logged in user
        Id userId = UserInfo.getUserId();
        List<Project__c> project = new List<Project__c>();
        //this part is to make sure to get exactly the name of the project 
        //and doesnt get similar projects
        projectName = '%' + projectName + '%'; 
        
        //query to get the project being updated
        project = [SELECT  Name 
                        FROM Project__c
                        WHERE User__c = :userId 
                        AND Name 
                        LIKE :projectName
                    ];

        //loop through the array
        for(Project__c a: project){
            a.Description__c= projectInput; //update the Description field
            update a; //update
        }
    }

    //method to delete a project
    //called when the user hits the delete button
    @AuraEnabled
    public static void deleteProjects(String projectName){

        //use the builtin UserInfo class to get the id (and other info) about the logged in user
        Id userId = UserInfo.getUserId();
        List<Project__c> project = new List<Project__c>();
        //this part is to make sure to get exactly the name of the project 
        //and doesnt get similar projects
        projectName = '%' + projectName + '%';
        
        //query for the project being deleted
        project = [SELECT  Name 
                        FROM Project__c
                        WHERE User__c = :userId 
                        AND Name LIKE :projectName 
                        LIMIT 1
                    ];

        //delete said project
        for(Project__c a: project){
            delete a;
        }
    }
}