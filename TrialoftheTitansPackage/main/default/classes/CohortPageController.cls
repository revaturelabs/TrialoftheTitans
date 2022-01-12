public with sharing class CohortPageController {
    @AuraEnabled
    public static String returnDomain(){
        String prefix = URL.getSalesforceBaseURL().toExternalForm().replace('https://', '').split('\\.')[0];
		prefix = prefix.removeEnd('--c');
 		return 'https://' + prefix.toLowerCase() + '.lightning.force.com';
    }
    @AuraEnabled
    public static List<Cohort__c> returnCohorts(){
        List<Cohort__c> cohorts = [SELECT Id, Name FROM Cohort__c ORDER BY Active__c DESC];
        return cohorts;
    }
}