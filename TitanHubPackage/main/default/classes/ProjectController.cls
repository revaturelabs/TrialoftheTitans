// Name: Project Controller
// Author: Rhys Kim
// Created: 6/1/2022
// Updated: TBA
// Descripton: Controller for a single project

public without sharing class ProjectController {

    // get responsibilities
    @AuraEnabled(cacheable=true)
    public static List<Responsibility__c> getResponsibilities(Id projectId) {
        return [SELECT Id, Name FROM Responsibility__c WHERE Project__c = :projectId];
    }

    // get skills
    @AuraEnabled(cacheable=true)
    public static List<Skill_Responsibility__c> getSkills(Id projectId) {
        List<Responsibility__c> proId = new List<Responsibility__c>();
        proId = [SELECT Id FROM Responsibility__c WHERE Project__c = :projectId limit 1];
        return [SELECT Id, Name FROM Skill_Responsibility__c WHERE Responsibility__c = :proId limit 1];
    }
    //get custom skills
    @AuraEnabled(cacheable=true)
    public static List<Custom_Skill__c> getCustomSkills(Id projectId){
        return [SELECT Id, Name, Project__c FROM Custom_Skill__c WHERE Project__c = :projectId];
    }

    // get role
    @AuraEnabled(cacheable=true)
    public static Project__c getRole(Id projectId){
        return [SELECT Role__c FROM Project__c WHERE Id = :projectId];
    }
}