public with sharing class SkillsController {

    @AuraEnabled(cacheable=true)
    public static List<String> getSkills() {
        List<Skill__c> skills = [SELECT name FROM Skill__c LIMIT 3];
        List<String> names = new List<String>();
        for (Skill__c s : skills) {
            names.add(s.name);            
        }
        return names;
    }
}