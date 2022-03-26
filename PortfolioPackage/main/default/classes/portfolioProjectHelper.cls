public without sharing class portfolioProjectHelper {
    @AuraEnabled(cacheable=true)    
    public static List<Project__c> getProjects(){
        id uid = UserInfo.getUserId();
        
        List<Project__c> projects = [
            SELECT Name, Description__c
            FROM Project__c
            WHERE User__c = :uid
            ORDER BY CreatedDate DESC
            LIMIT 3
        ];
        System.debug(projects);
        return projects;
    }

    @AuraEnabled   
    public static List<Project__c> getALLProjects(){
        id uid = UserInfo.getUserId();
        
        List<Project__c> projects = [
            SELECT Name, Description__c
            FROM Project__c
            WHERE User__c = :uid
            ORDER BY CreatedDate DESC
        ];
        return projects;
    }

    @AuraEnabled 
    public static void createProjects(String newProjectName){
        Id userId = UserInfo.getUserId();
        Project__c newProjectRec= new Project__c(Name = newProjectName, User__c=userId);
        insert newProjectRec;
    
    }

    @AuraEnabled
    public static void setProjects(String projectInput, String projectName){
    
        Id userId = UserInfo.getUserId();
        List<Project__c> project = new List<Project__c>();
        projectName = '%' + projectName + '%';
        
        project = [SELECT  Name 
                        FROM Project__c
                        WHERE User__c = :userId AND Name LIKE :projectName
                    ];

        for(Project__c a: project){
            a.Description__c= projectInput;
            update a;
        }
    }

    @AuraEnabled
    public static void deleteProjects(String projectName){
    
        Id userId = UserInfo.getUserId();
        List<Project__c> project = new List<Project__c>();
        projectName = '%' + projectName + '%';
        
        project = [SELECT  Name 
                        FROM Project__c
                        WHERE User__c = :userId AND Name LIKE :projectName LIMIT 1
                    ];

        for(Project__c a: project){
            delete a;
        }
    }
}
