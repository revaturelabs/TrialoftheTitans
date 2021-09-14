@istest
public with sharing class ExamAssignmentControllerTest {
    @IsTest
    static void singlePositiveTest() {
        //Populate Data
        Account acc = new Account(Name='test');
        insert acc;
        Exam__c ex = new Exam__c(Name='test');
        insert ex;
        Exam_Result__c exam = new Exam_Result__c(Status__c='Assigned', Account__c = acc.Id, Exam__c = ex.Id );
        insert exam;
        List<Exam_Result__c> result = ExamAssignmentController.getExams();
        System.assertEquals(1, result.size(), 'Return size is not equal to number inserted');
    }
    @IsTest
    static void bulkPositiveTest(){
        
        Test.startTest();
        Account acc = new Account(Name='test');
        insert acc;
        Exam__c ex = new Exam__c(Name='test');
        insert ex;
        
        List<Exam_Result__c> ExamList = new List<Exam_Result__c>();
        
        for(Integer i = 0; i<200; i++) {
            ExamList.add(new Exam_Result__c(Status__c='Assigned', Account__c = acc.Id, Exam__c = ex.Id ));
            
        }
        insert ExamLIst;

        List<Exam_Result__c> result = ExamAssignmentController.getExams();
        System.assertEquals(200, result.size(), 'return size is equal to number inserted');
        Test.stopTest();  
    }
    @IsTest
    static void negativeTest(){
        Exam_Result__c Exam = new Exam_Result__c();
        //populate no fields
        List<Exam_Result__c> result = ExamAssignmentController.getExams();
        system.assertEquals(0, result.size());
    }
}
