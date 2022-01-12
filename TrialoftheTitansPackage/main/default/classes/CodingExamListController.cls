////////////////////////////////////////////////////
//
//  Name: Exam Results Apex Controller
//  Author: Joshua Faaborg
//  Description: Controller for Coding Exam List Component
//               to be able to disply data from org 
//               on the component about Coding Exam Results
//               from each hero
//
////////////////////////////////////////////////////
public with sharing class CodingExamListController {
	@AuraEnabled
    public static List<Coding_Assessment__c> CodingExamList(String cohortId) {
        List<Coding_Assessment__c> testResult = [Select Name, Percent_Passed__c
                                                     From Coding_Assessment__c];
        return testResult;

    }
 
}