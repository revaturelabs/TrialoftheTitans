////////////////////////////////////////////////////
//
// Name: Exam Interview Apex Controller
// Author: Jayvious Williams
// Created: 2021-06-26
// Updated: 2021-06-26
// Description: Controller for our Exam Interview component.
//              This will be pulling the exam and questions for display in Exam.
//
////////////////////////////////////////////////////
public class ExamInterviewApexController {
    // loads exam questions usind examID
    @AuraEnabled
    public static List<Exam_Question__c> examFinder(String examID){
        List<Exam_Question__c> theExam = [SELECT Question_Text__c, Question_Type__c, Options__c, Correct_Answer_s__c FROM Exam_Question__c WHERE Titan__c != null];
        //exam = theExam[0].Exam__c;
        return theExam;  
    }

    // insert hero answers using answered exam questions
    @AuraEnabled
    public static void submitExam(String examId){
        
        // inserts exam related to the hero that took it
        Exam__c submittedExam = [SELECT Id FROM Exam__c WHERE Id = :examId LIMIT 1];
        Account account = [SELECT Id FROM Account WHERE Name = 'Gladius Maximus' LIMIT 1];
        
        Exam_Result__c examResult = new Exam_Result__c();
        examResult.Account__c = account.Id; 
        examResult.Exam__c = submittedExam.Id;
        
        insert examResult;
    }  

    // created a new list of hero answers that is the same size as the amount of questions
    @AuraEnabled
    public static void submitAnswers(List<Exam_Question__c> examQuestionList){
        List<Hero_Answer__c> heroAnswers = new List<Hero_Answer__c>();
        for(integer i=0; i<examQuestionList.size(); i++){
            heroAnswers.add(new Hero_Answer__c());
        }

        for(integer i=0; i<heroAnswers.size(); i++){
            heroAnswers[i].Exam_Question__c = examQuestionList[i].Id;
            heroAnswers[i].Exam_Result__c = [SELECT Id FROM Exam_Result__c ORDER BY createdDate DESC LIMIT 1].Id;
        }

        insert heroAnswers;

    }    
        

        
        
        
        
        
     

    
}
