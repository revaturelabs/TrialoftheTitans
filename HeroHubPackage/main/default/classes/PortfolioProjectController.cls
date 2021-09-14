/*
    CREATED BY: Murrai Scanlon
    USAGE: This class is used to interface with the server in order to retrieve hero/user Portfolio Project data.
           Functionality is working, but I still need to add validation and error handling.
*/

public with sharing class PortfolioProjectController {
   
    @AuraEnabled
    public String user{get; set;}
    @AuraEnabled
    public String description{get; set;}
    @AuraEnabled
    public String roles{get; set;}
    @AuraEnabled
    public String technologies{get; set;}
    @AuraEnabled
    public String name{get; set;}
    @AuraEnabled
    public List<Project__c> projectList{get; set;}
    
    
    @AuraEnabled
    public static PortfolioProjectController getDetails(Id userIdFromPage){
        
        //user id for testing: 0055f000000mwrOAAQ
        //user if for reals: WHERE User__r.Id =: u
        
        PortfolioProjectController lightningProp = new PortfolioProjectController();
        lightningProp.projectList = new List<Project__c>();
        for(Project__c projObj: [SELECT id, Name, Description__c, Roles_Responsibilities__c, Technologies__c, User__c 
                                 FROM Project__c
                                 WHERE User__r.Id =:userIdFromPage
                                 ORDER BY Name ASC
                                ]){
            lightningProp.projectList.add(projObj);
        }
        lightningProp.Name = lightningProp.projectList.get(0).Name;
        lightningProp.description = lightningProp.projectList.get(0).Description__c;
        lightningProp.roles = lightningProp.projectList.get(0).Roles_Responsibilities__c;
        lightningProp.technologies = lightningProp.projectList.get(0).Technologies__c;
        return lightningProp;
    }

}