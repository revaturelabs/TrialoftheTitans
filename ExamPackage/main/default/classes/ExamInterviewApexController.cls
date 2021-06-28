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
    //public Exam__c exam{get; set;}

    //public List<Exam_Question__c> questions{get; set;}

    @AuraEnabled
    public static List<Exam_Question__c> examFinder(String examID){
        List<Exam_Question__c> theExam = [SELECT Question_Text__c, Question_Type__c, Options__c, Correct_Answer_s__c FROM Exam_Question__c WHERE Question_Type__c = 'Matching' OR Question_Type__c = 'Numerical'];
        //exam = theExam[0].Exam__c;
        return theExam;

      
    }
}
