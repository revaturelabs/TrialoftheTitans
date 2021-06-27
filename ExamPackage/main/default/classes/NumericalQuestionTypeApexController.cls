public class NumericalQuestionTypeApexController {
//////////////////////////////////////////
//
//Name: NumericalQuestionTypeApexController
//Author: Jayvious Williams
//Date Created: 6/23/21
//Date Updated: 6/23/21
//Description: Temporary Controller for NumericalQuestionType Component
//
//////////////////////////////////////////

@AuraEnabled
    public static List<Exam_Question__c> pullNumericalQuestions(){
        List<Exam_Question__c> questionH = [SELECT Question_Type__c, Question_Text__c, Correct_Answer_s__c FROM Exam_Question__c WHERE Question_Type__c = 'Numerical'];

        if(questionH.size() != 0){
            return questionH;
        }else {
            return null;
        }
    }
}

