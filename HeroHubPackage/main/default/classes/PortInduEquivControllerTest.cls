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
        List<Portfolio_Skill__c> TestPort = [SELECT Name, Months__c FROM Portfolio_Skill__c];
        system.assertEquals(5, TestPort.size());

    }
    @isTest
    private static void UpdatingNewSkills(){
        for(integer i=0; i<5; i++){
            Portfolio_Skill__c PK = new Portfolio_Skill__c(Name='Test'+i,
                                                            Months__c = i,
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
        List<Portfolio_Skill__c> TestPort = [SELECT Name, Months__c FROM Portfolio_Skill__c];
        system.assertEquals(5, TestPort.size());
    }
    @isTest
    private static void ReturnSkillsTests(){
        test.startTest();
        List<Portfolio_Skill__c> PortSkillsFull = new List<Portfolio_Skill__c>();
        for(integer i=0;i<5;i++){
            Portfolio_Skill__c PKsingle = new Portfolio_Skill__c();
            PKsingle.Name = 'Test Name '+ i;
            PKsingle.Months__c =i ;
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
