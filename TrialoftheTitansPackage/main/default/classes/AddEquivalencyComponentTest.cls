@isTest
public class AddEquivalencyComponentTest {
    @TestSetup
    public static void makeData(){
        List<Titan__c> titanList = new List<Titan__c>();
        List<Titan__c> currTitans = new List<Titan__c>();
        titanList.add(new Titan__c(Name='Hercules', Technology__c='Java'));
        insert titanList;

        currTitans = [SELECT Name FROM Titan__c];
        List<Skill__c> skillList = new List<Skill__c>();
        skillList.add(new Skill__c(Name='Java', Titan__c= currTitans[0].id, Assigments__c='yeah', Skill_Breakdown__c='hahaha', Skill_Type__c='Coding'));
        skillList.add(new Skill__c(Name='Bootstrap', Titan__c= currTitans[0].id, Assigments__c='yeah', Skill_Breakdown__c='hahaha', Skill_Type__c='Coding'));
        skillList.add(new Skill__c(Name='Speaking', Titan__c= currTitans[0].id, Assigments__c='yeah', Skill_Breakdown__c='hahaha', Skill_Type__c='Coding'));
        insert skillList;
    }

    @isTest
    public static void getSkillsTest(){
        List<Skill__c> skillList = addEquivalencyComponentAuraController.getSkills();
        System.assertEquals(3, skillList.size());
        System.assertNotEquals(1, skillList.size());
    }
}
