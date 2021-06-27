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
    public static List<Exam__c> examFinder(String examName){
        List<Exam__c> theExam = [SELECT Name, (SELECT Question_Pool__r.Name FROM Exam_Pools__r) FROM Exam__c WHERE Name = :examName];
        //exam = theExam[0].Exam__c;
        return theExam;

      
    }
}
