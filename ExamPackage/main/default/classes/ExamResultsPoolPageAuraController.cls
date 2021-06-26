public with sharing class ExamResultsPoolPageAuraController {
    /////////////////////////////////////////////////////
//  Name: ExamResultsPoolPageAuraController
//  Author: Miguel McCrary
//  Description: This controller retrieves pool names from question assignment 
//  that are found in the current exam results. The first method retrieves all questions answered, 
//  the second retrieves all correct questions answered. Both retrieve respective pool names for each question.
///////////////////////////////////////////////////

@AuraEnabled
public static List<String> GetAllExamResultPoolQuestions(String examResultId){

    List<String> allExamResultPoolQuestions = new List<String>();

    for(Question_Assignment__c qa : [SELECT Exam_Question__c, Question_Pool__c, Question_Pool__r.Name
    FROM Question_Assignment__c 
    WHERE Exam_Question__c IN 
    (SELECT Exam_Question__c FROM Hero_Answer__c 
    WHERE Exam_Result__c = :examResultId)]){

    allExamResultPoolQuestions.add(qa.Question_Pool__r.Name);
    }

    return allExamResultPoolQuestions;
}

@AuraEnabled
public static List<String> GetCorrectExamResultPoolQuestions(String examResultId){

    List<String> correctExamResultPoolQuestions = new List<String>();

        for(Question_Assignment__c qa : [SELECT Exam_Question__c, Question_Pool__c, Question_Pool__r.Name
                                        FROM Question_Assignment__c 
                                        WHERE Exam_Question__c IN 
                                        (SELECT Exam_Question__c FROM Hero_Answer__c 
                                        WHERE Exam_Result__c = :examResultId AND Correct__c = True)]){

        correctExamResultPoolQuestions.add(qa.Question_Pool__r.Name);
        } 

        return correctExamResultPoolQuestions;
}

}
