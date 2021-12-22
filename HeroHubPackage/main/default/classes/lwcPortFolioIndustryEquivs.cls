public with sharing class lwcPortFolioIndustryEquivs {

    @AuraEnabled(cacheable=true)
    public static List<Equivalency__c> getSkillList() {


        //implement security  restrictions to only return data from the active user
        return[SELECT Name, Skill__c FROM Equivalency__c];

    }
}
