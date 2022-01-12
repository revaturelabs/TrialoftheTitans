//////////////////////////////////////////////////////////////////////
//
//  Name: Test_QCICohortSelectionAuraController
//  Author: Natalie Clark
//  Description:    Tests the following Apex classes:
//                  QCInterviewCohortSelectionAuraController
//
//////////////////////////////////////////////////////////////////////
@isTest
public class Test_QCICohortSelectionAuraController {
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
    }

    @isTest
    static void heroReviewTest() {

        //creates params for input into getHeroes method
        Cohort__c c = [SELECT Id FROM Cohort__c WHERE Name='cohortName' LIMIT 1];

        //executes getHeroes method, with system.asserts to verify
        List<Account> accs = QCInterviewCohortSelectionAuraController.getHeroes(c);

        System.assertEquals('cohortName', accs[0].Cohort__r.Name);
        System.assert(accs.size()==20);
        System.assertEquals('squadName', accs[0].Squad__r.Name);

        //executes getInterviews method, with system.asserts to verify
        List<QC_Interview__c> qci = QCInterviewCohortSelectionAuraController.getInterviews(accs);

        System.assert(qci[0].Finalized__c);
        System.assertEquals(4, qci[0].QC_Score__c);
        System.assert(qci.size() == 20);
    }
}