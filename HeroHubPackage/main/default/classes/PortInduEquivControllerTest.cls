@isTest
public class PortInduEquivControllerTest {
    //Test class for PortfolioIndustryEquivsController.cls Class
    @isTest
    private static void CreatingNewSkills(){
        List<String> TestSkills = new List<String>();
        List<Integer> TestMonths = new List<Integer>();

        for(integer i=0; i<5; i++){
            TestSkills.add('Test'+i);
            TestMonths.add(i);
        }

        PortfolioIndustryEquivsController.InputPortSkills(TestSkills, TestMonths);

        //System Assert Equals to test if 5 records were succesfully added to the Org
        List<Equivalency__c> TestPort = [SELECT Name, Skill_Equivalency__c FROM Equivalency__c];
        system.assertEquals(5, TestPort.size());

    }
    @isTest
    private static void UpdatingNewSkills(){
        for(integer i=0; i<5; i++){
            Equivalency__c PK = new Equivalency__c(Name='Test'+i,
                                                            Skill_Equivalency__c = i,
                                                            User__c = UserInfo.getUserId());
            insert PK;
        }
        List<String> TestSkills = new List<String>();
        List<Integer> TestMonths = new List<Integer>();

        for(integer i=0; i<5; i++){
            TestSkills.add('Test'+i);
            TestMonths.add(i);
        }

        PortfolioIndustryEquivsController.InputPortSkills(TestSkills, TestMonths);
        //System assert Equals to confirm list size has not increased with the updated records and update was succesful
        List<Equivalency__c> TestPort = [SELECT Name, Skill_Equivalency__c FROM Equivalency__c];
        system.assertEquals(5, TestPort.size());
    }
    @isTest
    private static void ReturnSkillsTests(){
        test.startTest();
        List<Equivalency__c> PortSkillsFull = new List<Equivalency__c>();
        for(integer i=0;i<5;i++){
            Equivalency__c PKsingle = new Equivalency__c();
            PKsingle.Name = 'Test Name '+ i;
            PKsingle.Skill_Equivalency__c =i ;
            PKsingle.User__c = UserInfo.getUserId();
            PortSkillsFull.add(PKsingle);
        }
        insert PortSkillsFull;

        List<String> TestString = PortfolioIndustryEquivsController.ReturnNames();
        List<Decimal> TestDecimal = PortfolioIndustryEquivsController.ReturnMonths();
        //System assert equals to test that both methods return the expected list size
        system.assertEquals(5, TestString.size());
        system.assertEquals(5, TestDecimal.size());
        test.stopTest();
    }

}
