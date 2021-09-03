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
        // Code Assessment Section
        Coding_Assessment__c[] codeList = new List<Coding_Assessment__c>();
        for (Integer i = 0; i < 200; i++) {
            Coding_Assessment__c codeAssess = new Coding_Assessment__c();
            
            codeAssess.Titan__c= titan.Id;
            codeList.add(codeAssess);
        }
        insert codeList;
        
        Hero_Apex_Test_Result__c[] cResultList= new List <Hero_Apex_Test_Result__c>();
        for (Integer i=0; i<200; i++){
            Hero_Apex_Test_Result__c car= new Hero_Apex_Test_Result__c();
            car.Coding_Assessment__c = codeList[i].Id;
            
            //car.Code_Assessment_Result_To_Account__c = acc.Id;
            cResultList.add(car);
        }
        insert cResultList;
    }
    @isTest
    static void getResultListTest() {
        Test.startTest();
        Exam_Result__c[] resultList = HeroResultPageController.getResultList();
        Test.stopTest();
        system.assertEquals(200, resultList.size());
    }
    @isTest
    static void getCodeAssessmentResultListTest(){
        Test.startTest();
        List<Id> cResultsList = HeroResultPageController.retrieveResults();
        Test.stopTest();
        system.assertEquals(200, cResultsList.size());
    }
    // Titan Section
    @isTest
    static void getTitanListTest() {
        Test.startTest();
        List<String> str = HeroResultPageController.getTitanList();
        Test.stopTest();
        system.assertEquals('test titan', str[0]);
    }
}