@isTest
public class HeroAssessmentListControllerTest {
	
	@isTest
    static void testHeroAssessmentTable(){
        
		List<Cohort__c> newCohorts = new List<Cohort__c>();

		Cohort__c newcohort = new Cohort__c(Name = 'Testcohort', Active__c = true);
		newCohorts.add(newcohort);

		Cohort__c newcohortTwo = new Cohort__c(Name = 'TestcohortTwo', Active__c = false);
		newCohorts.add(newcohortTwo);
		
        for(Integer i = 0 ; i <5 ; i++){
            Cohort__c pastCohort = new Cohort__c(Name = 'Testcohort' + i, Active__c = false);
		newCohorts.add(pastCohort);
        }

        database.insert(newCohorts);

		List<Account> accountsToAdd = new List<Account>();
		Account heroTest = new Account(Name = 'TestHero', Cohort__c = newcohort.Id);
		accountsToAdd.add(heroTest);
        
		Account heroTestTwo = new Account(Name = 'TestHeroTwo', Cohort__c = newcohortTwo.Id);
		accountsToAdd.add(heroTestTwo);

		database.insert(accountsToAdd);
        
		Assessment__c assessmentTest = new Assessment__c(Name = 'Test Assessment');
        database.insert(assessmentTest);
		
		List<Hero_Assessment__c> heroAssessmentsToAdd = new List<Hero_Assessment__c>();
		Hero_Assessment__c heroAssessmentTest = new Hero_Assessment__c( Hero__c = heroTest.Id, Assessment__c = assessmentTest.Id);
		Hero_Assessment__c heroAssessmentTestTwo = new Hero_Assessment__c( Hero__c = heroTestTwo.Id, Assessment__c = assessmentTest.Id);
		heroAssessmentsToAdd.add(heroAssessmentTest);
		heroAssessmentsToAdd.add(heroAssessmentTestTwo);
		database.insert(heroAssessmentsToAdd);

		System.assert(HeroAssessmentListController.HeroListAllCohorts().size() == 2,'Total list Not two hero assessment');
		System.assert(HeroAssessmentListController.HeroListAllCohorts().size() == [SELECT Id FROM Hero_Assessment__c].size(),'Total list doesnt match hero assessment soql statement');
		System.assert(HeroAssessmentListController.HeroList(newcohort.Id).size() == 1,'With cohort id not one hero assessment');

		System.assert(HeroAssessmentListController.SearchHeroList('TestHe', newcohort.Id).size() == 1,'With cohort id and search key not one hero assessment');
		System.assert(HeroAssessmentListController.SearchHeroList('Billy', newcohort.Id).size() == 0,'Billy should not have an hero assessment');	
    
		
	}

}