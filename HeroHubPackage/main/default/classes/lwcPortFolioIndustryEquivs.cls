public with sharing class lwcPortFolioIndustryEquivs {

    @AuraEnabled(cacheable=true)
    public static List<Equivalency__c> returnSkillNames() {
        Id UserId = UserInfo.getUserid();
        List<Equivalency__c> PortSkill = [SELECT Name, Skill_Equivalency__c FROM Equivalency__c WHERE User__c =:UserId];
        return PortSkill;
       


    }
}
