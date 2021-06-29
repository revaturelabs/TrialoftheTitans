////////////////////////////////////////////////////
//
//  Name: Flagged Hero Apex Controller
//  Author: Josue Cisneros
//  Description: Controller for Flagged Hero List 
//               Component to be able to disply data
//               from org on the component about each
//               Flagged Hero
//
////////////////////////////////////////////////////

public with sharing class FlaggedHeroController {
    @AuraEnabled
    public static List<QC_Flag__c> HeroList(){
        List<QC_Flag__c> flaggedHero = [SELECT Name, Description__c, Type__c,
                                        Account__r.Name, QC_Interview__r.Week__c, QC_Interview__r.QC_Score__c
                                        FROM QC_Flag__c];
        return flaggedHero;
    }
}