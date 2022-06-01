// Name: Project Controller
// Author: Rhys Kim
// Created: 6/1/2022
// Updated: TBA
// Descripton: Controller for a single project

public with sharing class ProjectController {
    @AuraEnabled(cacheable=true)

    // get responsibilities
    public static List<Responsibility__c> getResponsibilities(Id projectId) {
        return [SELECT Name FROM Responsibility__c WHERE Project__r = :projectId];
    }

    // get skills
    public static List<Skill_Responsibility__c> getSkills(Id responId) {
        return [SELECT Name FROM Skill_Responsibility__c WHERE Responsibility__r = :responId];
    }

    // get roles
}
