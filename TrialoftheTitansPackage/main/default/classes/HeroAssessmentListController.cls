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
    public static List<Hero_Assessment__c> SearchHeroList(String searchKey, String cohortId) {
        String name;
		String cohort;
        List<Hero_Assessment__c> heroAssessmentSearch;
        if(String.isEmpty(searchKey) && String.isEmpty(cohortId)){
            heroAssessmentSearch = [SELECT Assessment__r.Name, Overall_Score__c,
            Hero__r.Name
            FROM Hero_Assessment__c];
        }
        else if(String.isEmpty(searchKey)){
            cohort = cohortId;
            heroAssessmentSearch = [SELECT Assessment__r.Name, Overall_Score__c,
                                                         Hero__r.Name, Hero__r.Cohort__c
                                                         FROM Hero_Assessment__c
														 WHERE Hero__r.Cohort__c = :cohort ];
        }
        else{
        name =  + searchKey + '%';
		cohort = cohortId;
        heroAssessmentSearch = [SELECT Assessment__r.Name, Overall_Score__c,
                                                         Hero__r.Name
                                                         FROM Hero_Assessment__c
														 WHERE Hero__r.Cohort__c = :cohort and
                                                         Hero__r.Name LIKE :name];
    }

    return heroAssessmentSearch;
    }

}