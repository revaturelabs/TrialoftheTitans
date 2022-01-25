//////////////////////////////////////////////////////////////////////
//
//  Name: Test_QCHubHomeAuraController
//  Author: Natalie Clark
//  Description:    Tests the following Apex classes:
//                  QCSquadWrapper, QCCohortWrapper, 
//                  QCHubHomeAuraController
//
//////////////////////////////////////////////////////////////////////

@isTest
public class Test_QCHubHomeAuraController {
    @TestSetup
    static void makeData(){
    // factory creates 1 cohort (named cohortName) with 20 heroes (named namePrefix[0-19])
    // each hero receives 1 interview and 5 interview questions
        QCHubDataFactory.dataFactory('cohortName', 'namePrefix');

        //creates team and squads for heroes created
        //delete following lines if refactored QCHubDataFactory to include squad assignation
        Team__c t = new Team__c(Name='teamName');
        insert t;
        Squad__c s = new Squad__c(Name='squadName', Team__c=t.Id);
        insert s;
        List<Account> accountUpdate = [SELECT Id FROM Account];
        for (Integer i=0 ; i<accountUpdate.size() ; i++) {
            accountUpdate[i].Squad__c = s.Id;
        }
        update accountUpdate;

        //updates Finalized__c field for all interviews
        List<QC_Interview__c> interviews = [SELECT Id FROM QC_Interview__c];
        for (Integer i=0 ; i<interviews.size() ; i++) {
            interviews[i].Finalized__c = true;
            interviews[i].QC_Score__c = 4;
        }
        update interviews;

        //note that QC_Interview_Sum__c and QC_Interview_Count__c fields are roll-up-summary fields
    }

    @isTest
    static void HubHomeTest() {
        //creates params for input into RetrieveCohortData method
        //executes getHeroes method, with system.asserts to verify
        List<Cohort__c> cohorts = QCHubHomeAuraController.RetrieveCohorts();
        String str = JSON.serialize(cohorts[0]);

        System.assertEquals('cohortName', cohorts[0].Name);

        //executes RetrieveCohortData method, with system.asserts to verify
        QCCohortWrapper cw = QCHubHomeAuraController.RetrieveCohortData(str);

        //tests QCCohortWrapper
        System.assert(cw.squadMap.containsKey('squadName'));
        System.assertEquals('cohortName', cw.cohort.Name);
        //tests QCSquadWrapper
        //System.assertEquals('squadName', cw.squadList[0].squad.Name);
        //System.assertEquals('namePrefix0', cw.squadList[0].heroes[0].Name);
    }

}