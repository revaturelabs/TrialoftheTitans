public class addEquivalencyComponentAuraController {
<<<<<<< HEAD
    @AuraEnabled(cacheable=true)
=======
    @AuraEnabled
>>>>>>> team3-tm-auraToLWC23b
    public static List<Skill__c> getSkills(){
        List<Skill__c> skillList = [SELECT Name FROM Skill__c];
        return skillList;
    }
}