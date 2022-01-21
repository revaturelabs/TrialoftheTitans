/*
    Author: Tyler Curry-Wong
    Description: Apex Controller for MultipleChoiceQuestion component
*/
public with sharing class MultipleChoiceQController {
    @AuraEnabled
    public static Exam_Question__c fetchMultipleChoice(){
        return  [SELECT Question_Text__c, Options__c, Correct_Answer_s__c 
                    FROM Exam_Question__c WHERE Question_Type__c = 'Multiple Choice' LIMIT 1];
    }
}