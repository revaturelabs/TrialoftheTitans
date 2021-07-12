@isTest
public class DynamicRowAuraControllerTest{
    @TestSetup
    public static void makeData(){
        List<Titan__c> titanList = new List<Titan__c>();
        List<Project__c> projList = new List<Project__c>();
        List<Skill__c> skillList = new List<Skill__c>();

        titanList.add(new Titan__c(Name='Hercules', Technology__c='Java'));
        insert titanList;

        projList.add(new Project__c(Name='Test Project', Description__c='My test project'));
        insert projList;

        List<Titan__c> currTitans = [SELECT Name FROM Titan__c];
        skillList.add(new Skill__c(Name='Java', Titan__c= currTitans[0].id, Assigments__c='yeaaa', Skill_Breakdown__c='hahahahaha', Skill_Type__c='coding'));
        skillList.add(new Skill__c(Name='Python', Titan__c= currTitans[0].id, Assigments__c='yeaaa', Skill_Breakdown__c='hahahahaha', Skill_Type__c='coding'));
        skillList.add(new Skill__c(Name='Speaking', Titan__c= currTitans[0].id, Assigments__c='yeaaa', Skill_Breakdown__c='hahahahaha', Skill_Type__c='coding'));
        insert skillList;
    }

    @isTest
    public static void saveEquivalencyTest(){
        List<Equivalency__c> equivList = new List<Equivalency__c>();
        List<Equivalency__c> savedEquivList = new List<Equivalency__c>();
        
        List<Skill__c> skillList = [SELECT Name FROM Skill__c];
        List<Project__c> projList = [SELECT Name FROM Project__c];

        equivList.add(new Equivalency__c(Project__c=projList[0].id, Skill__c=skillList[0].id, Skill_Equivalency__c=2));
        equivList.add(new Equivalency__c(Project__c=projList[0].id, Skill__c=skillList[1].id, Skill_Equivalency__c=2));
        equivList.add(new Equivalency__c(Project__c=projList[0].id, Skill__c=skillList[2].id, Skill_Equivalency__c=2));

        dynamicRowAuraController.saveEquivalency(equivList);

        savedEquivList = [SELECT id FROM Equivalency__c];
        System.assertEquals(3, savedEquivList.size());
    }

    @isTest
    public static void retrieveCurrentEquivalenciesTest(){
        List<Equivalency__c> equivList = new List<Equivalency__c>();
        List<Project__c> projList = [SELECT Name FROM Project__c];
        List<Skill__c> skillList = [SELECT Name FROM Skill__c];

        equivList.add(new Equivalency__c(Project__c=projList[0].id, Skill__c=skillList[0].id, Skill_Equivalency__c=2));
        equivList.add(new Equivalency__c(Project__c=projList[0].id, Skill__c=skillList[1].id, Skill_Equivalency__c=2));
        equivList.add(new Equivalency__c(Project__c=projList[0].id, Skill__c=skillList[2].id, Skill_Equivalency__c=2));
        insert equivList;

        List<Equivalency__c> savedEquivList = dynamicRowAuraController.retrieveCurrentEquivalencies(projList[0].id);
        System.assertEquals(3, savedEquivList.size());
    }
}
