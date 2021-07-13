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


		System.assert(newCohorts[0].Active__c == true, 'First is not active');
		System.assert(newCohorts[1].Active__c == false, 'Second is active');			
		

		List<Cohort__c> pastCohorts = TrainerHubPastCohortsTableAuraController.fetchPastCohorts();	     
        String activeCohort = TrainerHubPastCohortsTableAuraController.fetchActiveCohort();

		for(Cohort__c c : pastCohorts)
        {
		System.assert(c.Active__c == false, 'cohort__c ' + c +  ' is not active');
		}

    }
}