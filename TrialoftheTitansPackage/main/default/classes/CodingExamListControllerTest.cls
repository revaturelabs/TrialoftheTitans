@isTest
public class CodingExamListControllerTest {
	
    @isTest
    static void testSet() {
        Test.startTest();
        Coding_Assessment__c c = new Coding_Assessment__c();
        insert c;
        
        List<Coding_Assessment__c> d  = CodingExamListController.CodingExamList(c.ID);
        Test.stopTest();
        
        System.assertEquals(c.Id, d[0].Id);
    }
}