// Name: Project Controller
// Author: Rhys Kim
// Created: 6/1/2022
// Updated: TBA
// Descripton: Controller for a single project

public with sharing class ProjectController {
    @AuraEnabled(cacheable=true)

    // get responsibilities
    public static List<Responsibility__c> getResponsibilities(Id projectId) {
        return [SELECT Name FROM Responsibility__c WHERE Project__c = :projectId];
    }

    // get skills
    public static List<Skill_Responsibility__c> getSkills(Id responId) {
        return [SELECT Name FROM Skill_Responsibility__c WHERE Responsibility__c = :responId];
    }

    // get roles
    @AuraEnabled(cacheable=true)
    public static Project__c getRole(Id projectId){
        Project__c role = new Project__c();
        role = [SELECT Roles_Responsibilities__c FROM Project__c WHERE Id = :projectId Limit 1];
        return role;
    }
}
