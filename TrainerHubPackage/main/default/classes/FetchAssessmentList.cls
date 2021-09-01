
    public with sharing class FetchAssessmentList{

        @AuraEnabled(cacheable=true)
        public static List<Assessment__c> GetAssessmentList () {
            
            List<Assessment__c> MyAssessmentList = [SELECT Name, Type__c FROM Assessment__c ];
            return MyAssessmentList;
    
     }
    }

