////////////////////////////////////////////////////
//
//  Name: Assessment Apex Controller
//  Author: Josue Cisneros
//  Description: Controller for Assessment List 
//               Component to be able to disply data
//               from org on the component about each
//               Assessment
//
////////////////////////////////////////////////////

public with sharing class AssessmentListController {
    @AuraEnabled
    public static List<Assessment__c> AssessmentList(){
        List<Assessment__c> assessmentResultSearch = [SELECT Name, Type__c FROM Assessment__c];
        return assessmentResultSearch;
    }
}
