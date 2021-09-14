/////////////////////////////////////////////////////
//
//  Name: PortfolioProjectController
//  Author: Murrai Scanlon
//  Description: This controller queries Project data needed to display on the Portfolio Project Aura component.
//  	It also allows the user to create a new project from the Portfolio Project Aura component. However, the
//  	Save functionality for a project Update is not currently working.
//  
//
///////////////////////////////////////////////////

public class PortfolioProjectController {
    

    
    @AuraEnabled
    // Get the Project data for the running user
    public static List<Project__c> getProjects(Id userIdFromPage){
        
        //Testing specific hero user: 0055f000000mwrOAAQ
        //Testing sys admin id: 0055f000000mn0YAAQ
        //Testing running user: :userIdFromPage
        
        List<Project__c> projects = new List<Project__c>();
        
        projects = [SELECT id, Name, Description__c, Roles_Responsibilities__c, Technologies__c, User__c 
                                 FROM Project__c
                                 WHERE User__r.Id = :userIdFromPage
                                 ORDER BY Name ASC
                                ];
        
        return projects;
    }
    
    @AuraEnabled
    // Create or update project information provided by the Portfolio Projects Aura component
    // The creation functionality is working, but the update functionality is not
    public static String createProject(Project__c projObj, Boolean updateParam){
        
        projObj.User__c = UserInfo.getUserId(); // Assign running user to new project
        
        if(updateParam){
            update projObj; // If the incoming parameter indicates and update, perform update DML
        } else {
            upsert projObj; // otherwise, create a new project
        }
        
        return projObj.Id; //return the new project Id for display in the Aura component
    }

}