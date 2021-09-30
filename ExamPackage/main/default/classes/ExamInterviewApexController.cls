/**
 * @name              :  Exam Interview Apex Controller
 * @description       :  Controller for our Exam Interview component.This will be      pulling the exam and questions for display in Exam.
 * @author            : Jayvious Williams
 * @group             : 
 * @last modified on  : 09-30-2021
 * @last modified by  : Daniel Boice
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   2021-06-26   Jayvious Williams   Initial Version
**/

public class ExamInterviewApexController {
    // loads exam questions usind examID
    @AuraEnabled(cacheable=true)
    public static List<Exam_Question__c> examFinder(String examID){
        List<Exam_Question__c> theExam = [SELECT Question_Text__c, Question_Type__c, Options__c, Correct_Answer_s__c FROM Exam_Question__c WHERE Titan__c != null];
        //exam = theExam[0].Exam__c;
        return theExam;  
    }

    // insert hero answers using answered exam questions
    @AuraEnabled
    public static void submitExam(String examId){
        
        // inserts exam related to the hero that took it and updates the exam result
        Exam__c submittedExam = [SELECT Id FROM Exam__c WHERE Id = :examId LIMIT 1];
        Account account = [SELECT Id FROM Account WHERE Name = 'Gladius Maximus' LIMIT 1];
        
        Exam_Result__c examResult = [SELECT Id FROM Exam_Result__c WHERE Account__c = :account.Id AND Status__c = 'Assigned' AND Exam__c = :examId];
        examResult.Status__c = 'Completed';
        update examResult;
    }

    // created a new list of hero answers that is the same size as the amount of questions
    @AuraEnabled
    public static void submitAnswers(List<Exam_Question__c> examQuestionList, Map<String, String> examAnswerList){

        // creates and populates a list of hero answers that are the same size as the number of wuestions
        List<Hero_Answer__c> heroAnswers = new List<Hero_Answer__c>();
        for(integer i=0; i<examQuestionList.size(); i++){
            heroAnswers.add(new Hero_Answer__c());
        }
        Exam_Result__c examId = [SELECT Id FROM Exam_Result__c ORDER BY lastModifiedDate DESC LIMIT 1];
        // fills out fields for each hero answer in the hero aanswers list
        for(integer i=0; i<heroAnswers.size(); i++){
            heroAnswers[i].Exam_Question__c = examQuestionList[i].Id;
            heroAnswers[i].Answer_Choice__c = examAnswerList.get(String.valueOf(i+1));
            heroAnswers[i].Exam_Result__c = examId.Id;
            if(ExamQuestionList[i].Question_Type__c == 'Multiple Choice - multiple answers') {
                //system.debug(examQuestionList[i]);
                Set<String> heroSet = new Set<String>(heroAnswers[i].Answer_Choice__c.split('||'));
                //system.debug(heroAnswers);
                Set<String> answerSet = new Set<String>(examQuestionList[i].Correct_Answer_s__c.split('||'));
                //system.debug(answerSet);
                if(heroSet.Equals(answerSet)){
                    heroAnswers[i].Correct__c = true;
                }
            }
            else if(heroAnswers[i].Answer_Choice__c == examQuestionList[i].Correct_Answer_s__c){
                heroAnswers[i].Correct__c = true;
                
            }
            
        }
        insert heroAnswers; 
    }    
}
