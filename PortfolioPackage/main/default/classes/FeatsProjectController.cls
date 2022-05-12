
/* Author: Nam Phan
    Description: LWC component controller that increase functionality with the projects component.
    Date Created: 05/11/2022
    Modified Date: 05/11/2022
    Iteration XII */

public with sharing class FeatsProjectController {

    @AuraEnabled
    public static string getProjects(){
        try {
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    public FeatsProjectController() {

    }
}
