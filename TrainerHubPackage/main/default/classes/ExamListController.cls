////////////////////////////////////////////////////
//
//  Name: Exam Results Apex Controller
//  Author: Josue Cisneros
//  Description: Controller for Exam List Component
//               to be able to disply data from org 
//               on the component about Exam Results
//               from each hero
//
////////////////////////////////////////////////////

public with sharing class ExamListController {
    @AuraEnabled
    public static List<Exam_Result__c> ExamList(String cohortId){
		String cohort = cohortId;
        List<Exam_Result__c> examResultSearch = [SELECT Account__r.Name, Exam__r.Name, Score__c,
                                                Total_Correct__c, Total_Answers__c
                                                FROM Exam_Result__c
												WHERE Account__r.Cohort__c = :cohort];
        return examResultSearch;
    }

    @AuraEnabled
    public static List<Exam_Result__c> SearchExamList(String searchKey, String cohortId){
        String name =  + searchKey + '%';
		String cohort = cohortId;
        List<Exam_Result__c> examResultSearch = [SELECT Account__r.Name, Exam__r.Name, Score__c,
                                                Total_Correct__c, Total_Answers__c
                                                FROM Exam_Result__c
                                                WHERE Account__r.Name
                                                LIKE :name and Account__r.Cohort__c = :cohort];
        return examResultSearch;
    }
}