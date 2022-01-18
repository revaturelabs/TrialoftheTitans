public with sharing class PortfolioIndustryEquivsController {

    //Takes the records (if any) of the specific user and replaces the default attribute list with the records
    @AuraEnabled



    public static List<String> ReturnNames(){

        List<String> ReturnName = new List<String>();
        id UserId = UserInfo.getUserId();
        //Get list of skills from specific user
        List<Equivalency__c> PortSkill = [SELECT Name, Skill_Equivalency__c FROM Equivalency__c WHERE User__c =:UserId];
        //If there are not values return default value set
        if(PortSkill.isEmpty()){
            for(integer i=0; i<5; i++){
                ReturnName.add('Skill #'+i);
            }
            return ReturnName; 
        }
        //If there are records replace default value set with already saved records
        else{
            for(Equivalency__c PK : PortSkill){
                ReturnName.add(PK.Name);
            }
        }
        return ReturnName;
    }


    //Same exact method as above except returns the respective months 
    @AuraEnabled
    public static List<Decimal> ReturnMonths(){
        List<Decimal> ReturnMonth = new List<Decimal>();
        id UserId = UserInfo.getUserId();
        //Get list of skills from specific user
        List<Equivalency__c> PS = [SELECT Name,Skill_Equivalency__c FROM Equivalency__c WHERE User__c =:UserId];
        //If there are no values return default value set
        if(PS.isEmpty()){
            for(integer i=0; i<5; i++){
                ReturnMonth.add(i);
            }
            return ReturnMonth;
        }
        //If there are records replace default value set with already saved records
        else{
            for(Equivalency__c PK: PS){
                ReturnMonth.add(PK.Skill_Equivalency__c);
            }
        }
        return ReturnMonth;
    }

    //Take the parameters from PortfolioIndustryEquivsController.Js and create/update the inputed skills
    @AuraEnabled
    public static void InputPortSkills(List<String> newSkills, List<Integer> newEquivs ){

        /*
        The List of newSkills comes like ['Skill 1', 'Skill 2', 'Skill 3',...] up to 5 --- INDEX STARTS AT 0!!
        The List of newEquivs comes like [1,2,3,4,5] each month is the same index as its respective skill
        Equivalency__c only has 3 fields. Name, Skill_Equivalency__c, User__c
        */

        //Get a list of all the Portfolio skills in the system from running user
        id UserId = UserInfo.getUserId();
        List<Equivalency__c> OldSkills = [SELECT Name, Skill_Equivalency__c, User__c FROM Equivalency__c WHERE User__c =: UserId];

        if(OldSkills.isEmpty()){
            //create new Skills
            for(integer i=0; i < 5; i++){
                Equivalency__c PortSkill = new Equivalency__c();
                PortSkill.Name = newSkills[i];
                PortSkill.Skill_Equivalency__c = newEquivs[i];
                PortSkill.User__c = UserInfo.getUserId();
                insert PortSkill;
            }

        }
        else{
            //update the skills in place
            //creating new List of the inputed values
            List<Equivalency__c> NewSkillList = new List<Equivalency__c>();
            for(integer i=0; i<5; i++){
                Equivalency__c SingleNewSkill = new Equivalency__c();
                SingleNewSkill.Name = newSkills[i];
                SingleNewSkill.Skill_Equivalency__c = newEquivs[i];
                SingleNewSkill.User__c = UserInfo.getUserId();
                NewSkillList.add(SingleNewSkill);
            }
            //Updating the old list with the new values 
            for(integer i=0; i<5; i++){
                OldSkills[i].name = NewSkillList[i].name;
                OldSkills[i].Skill_Equivalency__c = newSkillList[i].Skill_Equivalency__c;
                OldSkills[i].User__c = NewSkillList[i].User__c; 
            }
            update OldSkills;

            
        }
        
    }
}