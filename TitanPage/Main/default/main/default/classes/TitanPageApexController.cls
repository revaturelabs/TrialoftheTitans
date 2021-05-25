public without sharing class TitanPageApexController {
    public TitanPageApexController() {

    }

    @AuraEnabled
    public static List<Titan__c> getTitans() {
        //Method for retrieving list of titans
        List<Titan__c> titanList = [SELECT Name FROM Titan__c];
        return titanList; 
    }

    @AuraEnabled
    public static List<Skill__c> getSkills() {
        //Method for retrieving list of associated skills
        List<Skill__c> skillsList = [SELECT Name FROM Skill__c];
        return skillsList; 
    }

    
}
