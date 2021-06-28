/*
    Author: Tyler Curry-Wong
    Description: Apex Controller for TrueFalseQuestion component
*/
public with sharing class TrueFalseQController {
    public class TrueFalseQController {
        @AuraEnabled
       public static List<Exam_Question__c> fetchTrueFalseQ(){
           return [SELECT Question_Text__c, Correct_Answer_s__c 
                    FROM Exam_Question__c WHERE Question_Type__c = 'True-false' LIMIT 1];
   
       }
   }
}
