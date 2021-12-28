public with sharing class lwcPortFolioIndustryEquivs {

    //returns any records to the javascript controller for each item to be iterated upon.
    @AuraEnabled(cacheable=true)
    public static List<Equivalency__c> returnSkillNames() {
        Id UserId = UserInfo.getUserid();
        List<Equivalency__c> PortSkill = [SELECT Name, Skill_Equivalency__c FROM Equivalency__c WHERE User__c =:UserId LIMIT 5];
        
        //fill in default data if the returned list is empty.
        if(PortSkill.isEmpty()){
            for(integer i=0; i<5; i++){
                PortSkill.add(new Equivalency__c(
                    Name = 'Skill No. '+i,
                    Skill_Equivalency__c = i + 6));
            }
        }
        return PortSkill;
    }
}