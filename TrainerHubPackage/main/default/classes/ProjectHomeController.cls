/////////////////////////////////////////////////////
//
//  Name: Project Home Controller
//  Author: Laurent Sanou
//  Description: this controller pulls all the project  
//  			 records from the database for the list
//  			 to be displayed on the project home page
//  			 
///////////////////////////////////////////////////


public with sharing class ProjectHomeController {
    
    //retrieveProjects() function fetches all Project__c records to be displayed
    //on the projects home page
    
    @Auraenabled
    public static List<Project__c> retrieveProjects(){
        try{
            final List<Project__c> projects = [SELECT Name, Description__c FROM Project__c ORDER BY Name];
            return projects;
        }catch(Exception ex){
            CalloutException e = new CalloutException();
            e.setMessage('Unexpected error: we were unable to retrive the list of projects');
            throw e;
        }

    }
}