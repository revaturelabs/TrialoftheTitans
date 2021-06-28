////////////////////////////////////////////////////
//
//  Name: QC Interview Apex Controller
//  Author: Josue Cisneros
//  Description: Controller for QC Interview  
//               Component to be able to disply data
//               from org on the component about each
//               QC Interview for each hero
//
////////////////////////////////////////////////////

public with sharing class QCInterviewController {
    @AuraEnabled
    public static List<QC_Interview__c> HeroList(){
        List<QC_Interview__c> qcInterviews = [SELECT Name, Account__r.Name, Week__c, QC_Score__c
                                        FROM QC_Interview__c];
        return qcInterviews;
    }
}
