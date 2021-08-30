public class addEquivalencyComponentAuraController {
    @AuraEnabled(cacheable=true)
    public static List<Skill__c> getSkills(){
        List<Skill__c> skillList = [SELECT Name FROM Skill__c];
        return skillList;
    }
}