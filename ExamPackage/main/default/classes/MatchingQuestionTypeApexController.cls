//////////////////////////////////////////
//
//Name: MatchingQuestionTypeApexController
//Author: Jayvious Williams
//Date Created: 6/21/21
//Date Updated: 6/21/21
//Description: Temporary Controller for MatchingQuestionType Component
//
//////////////////////////////////////////
//
public class MatchingQuestionTypeApexController{
    public static List<Exam_Question__c> questionHolder{get; set;}
/*
    @AuraEnabled
    public static List<Exam_Question__c> pullMatchingQuestions(){
        List<Exam_Question__c> questionH = [SELECT Question_Type__c, Question_Text__c, Correct_Answer_s__c, Options__c FROM Exam_Question__c WHERE Question_Type__c = 'Matching'];

        if(questionH.size() != 0){
            return questionH;
        }else {
            return null;
        }

    }
    */
}