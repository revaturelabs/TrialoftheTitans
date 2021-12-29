public with sharing class lwcPortFolioIndustryEquivs {

    //returns any records to the javascript controller for each item to be iterated upon.
    @AuraEnabled(cacheable=true)
    public static List<Equivalency__c> returnSkillNames() {
        Id UserId = UserInfo.getUserid();
        List<Equivalency__c> PortSkill = [SELECT Name, id, Skill_Equivalency__c FROM Equivalency__c WHERE User__c =:UserId LIMIT 5];
        
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
    

    //returns 5 record Id's from the current active user for record edit of skills and skill equivalencies.
    @AuraEnabled(cacheable=true)
    public static List<Id> returnId(){
        Id userId = userInfo.getUserId();
        List<Equivalency__c> equiv = [select id from Equivalency__c where User__c =:UserId limit 5];
        List<id> returnList = new List<id>();
        for(Equivalency__c Pk: equiv){
            returnList.add(pk.id);
        }
        return returnList;
    }
}