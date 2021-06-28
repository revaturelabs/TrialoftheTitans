@isTest
public class TrainHubPastCohortsTable_Test {
	
	@isTest
    static void testPastCohortsTable(){
        
		List<Cohort__c> newCohorts = new List<Cohort__c>();

		Cohort__c newcohort = new Cohort__c(Name = 'Testcohort', Active__c = true);
		newCohorts.add(newcohort);

        for(Integer i = 0 ; i <5 ; i++){
            Cohort__c pastCohort = new Cohort__c(Name = 'Testcohort' + i, Active__c = false);
		newCohorts.add(pastCohort);
        }

        database.insert(newCohorts);

		TrainerHubPastCohortsTableAuraController.fetchPastCohorts();
        
        TrainerHubPastCohortsTableAuraController.fetchActiveCohort();

    }
}