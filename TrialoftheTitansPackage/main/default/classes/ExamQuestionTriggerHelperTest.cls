//////////////////////////////////////////
//
//Name: ExamQuestionTriggerHelperTest
//Author: Zain Hamid
//Date Created: 02/10/22
//Date Updated: 02/10/22
//Description: Test class for ExamQuestionTriggerHelper
//
//////////////////////////////////////////
//

@isTest
public with sharing class ExamQuestionTriggerHelperTest {
    public ExamQuestionTriggerHelperTest() {

    }
    private static Integer numberOfTests = 20;


    /*Schema.DescribeFieldResult fieldDetail =Exam_Question__c.Question_Type__c.getDescribe();   
    List<Schema.PicklistEntry> values = fieldDetail.getPicklistValues();
    for(Schema.PicklistEntry value: values) */

    @TestSetup
    static void setup() {
        List<Exam_Question__c> tfQuestions = new List<Exam_Question__c>();
        for(Integer i = 0; i <= numberOfTests; i++) {
            tfQuestions.add(new Exam_Question__c(Name = 'This is Test Question ' + i, Question_Type__c = 'True-False', Question_Text__c = 'This is test question ' + i + ' text.'));
        }
        insert tfQuestions;
    }
    
    @isTest
    static void tfCorrectOptionsBulk() {
        Integer successes;
        List<Exam_Question__c> allTFQuestions = [SELECT Id,Name,Question_Type__c,Question_Text__c,Options__c FROM Exam_Question__c WHERE Question_Type__c = 'True-False'];
        for(Exam_Question__c question: allTFQuestions) {
            if(question.Options__c == 'TRUE||FALSE') {
                successes++;
            }
        }

        System.assertEquals(numberOfTests, successes);
    }
}
