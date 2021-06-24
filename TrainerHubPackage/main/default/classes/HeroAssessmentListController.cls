////////////////////////////////////////////////////
//
//  Name: Hero Assessment Apex Controller
//  Author: Josue Cisneros
//  Description: Controller for Hero Assessment List
//               Component to be able disply data 
//               from org on the component
//
////////////////////////////////////////////////////

public with sharing class HeroAssessmentListController {
    @AuraEnabled
    public static List<Hero_Assessment__c> HeroList() {
        List<Hero_Assessment__c> heroAssessmentSearch = [SELECT Assessment__r.Name, Overall_Score__c,
                                                         Hero__r.Name
                                                         FROM Hero_Assessment__c];
        return heroAssessmentSearch;
    }

    @AuraEnabled
    public static List<Hero_Assessment__c> SearchHeroList(String searchKey) {
        String name =  + searchKey + '%';
        List<Hero_Assessment__c> heroAssessmentSearch = [SELECT Assessment__r.Name, Overall_Score__c,
                                                         Hero__r.Name
                                                         FROM Hero_Assessment__c
                                                         WHERE Hero__r.Name
                                                         LIKE :name];
        return heroAssessmentSearch;
    }
}
