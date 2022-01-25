/////////////////////////////////////////////////////
//
//  Name: HeroListControllerTest
//  Author: Kameron Fincher
//  Description: Test class for HeroListController
//	
///////////////////////////////////////////////////
@isTest
public class HeroListControllerTest {
    @testSetup 
    static void Setup(){
        Team__c newTeam = new Team__C(Name='Amplifire');
        insert newTeam;

        Squad__c newSquad = new Squad__c(Name = 'This is Fire', Team__c = newTeam.Id);
        insert newSquad;
        
       	Curriculum__c newCurriculum = new Curriculum__c(Name='Salesforce');
        
        insert newCurriculum;
        
        Schema.DescribeSObjectResult acctDesc = Account.SObjectType.getDescribe();
		Map<String, Schema.RecordTypeInfo> acctRecTypeMap = acctDesc.getRecordTypeInfosByName();
		Id heroTypeId = acctRecTypeMap.get('Hero').getRecordTypeId();
        
        List<Account> userAccounts = new List<Account>();
        
        for(Integer i = 0; i < 5; i++){
            Account newAccount = new Account(name='User'+i, Squad__c = newSquad.Id, Team__c = newTeam.Id, Curriculum__C = newCurriculum.Id, RecordTypeId = heroTypeId );
            userAccounts.add(newAccount);
        }
        
        insert userAccounts;
    }
    
    @isTest
    static void NegativeTest(){
        List<Account> acc = HeroListController.HeroList('Fake Cohort');
        System.assertEquals(acc.size(), 0);
    }
    
	@isTest
    static void PositiveTest(){
        AssessmentSetup.associateCohort();
        Cohort__c testCohort = [Select Name, Active__c from Cohort__c WHERE Active__c = true LIMIT 1];
        List<Account> acc = HeroListController.HeroList(testCohort.id);
        System.assertEquals(acc.size(), 5);
    }
}