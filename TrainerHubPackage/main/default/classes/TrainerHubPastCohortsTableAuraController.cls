public with sharing class TrainerHubPastCohortsTableAuraController {
	
	// For getting a list of previous cohorts, aka inactive cohorts
	@AuraEnabled
    public static List<Cohort__c> fetchPastCohorts() {
		String currentUser = UserInfo.getUserId();
        List<Cohort__c> pastCohorts = [SELECT Id, Name, Active__c FROM Cohort__c WHERE Active__c = false and OwnerId = :currentUser];
        return pastCohorts;
    }

	// For getting an individual record which is the active cohort
	@AuraEnabled
	public static Id fetchActiveCohort() {
		String currentUser = UserInfo.getUserId();
		Id activeCohortId;
        List<Cohort__c> activeCohort = [SELECT Id FROM Cohort__c WHERE Active__c = true and OwnerId = :currentUser];
        activeCohortId = activeCohort[0].Id;
        return activeCohortId;
    }
}