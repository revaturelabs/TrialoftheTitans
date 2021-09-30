@isTest
private class HeroResultPageController_Test {

   
    @TestSetup
    static void makeData(){
        Account acc = new Account(Name = 'Gladius Maximus');
        insert acc;

        Titan__c titan = new Titan__c();
        titan.Name = 'test titan';
        titan.Technology__c = 'Salesforce';
        insert titan;

        Exam__c[] examList = new List<Exam__c>();
        for (Integer i = 0; i < 200; i++) {
            Exam__c exam = new Exam__c();
            exam.Name = 'myExam';
            exam.Titan__c = titan.Id;
            examList.add(exam);
        }
        insert examList;

        Exam_Result__c[] resultList = new List<Exam_Result__c>();
        for (Integer i = 0; i < 200; i++) {
            Exam_Result__c result = new Exam_Result__c();
            result.Exam__c = examList[i].Id;
            result.Account__c = acc.Id;
            resultList.add(result);
        }
        insert resultList;
        // system.debug([SELECT Name, Exam__c, Account__r.Name from Exam_Result__c]);
    }
    @isTest
    static void getResultListTest() {
        Test.startTest();
        Exam_Result__c[] resultList = HeroResultPageController.getResultList();
        Test.stopTest();
        system.assertEquals(200, resultList.size());
    }
    @isTest
    static void getTitanListTest() {
        Test.startTest();
        List<String> str = HeroResultPageController.getTitanList();
        Test.stopTest();
        system.assertEquals('test titan', str[0]);
    }
}