@isTest
public class Test_QCInterviewHeroReviewAuraController {
    @TestSetup
    static void makeData(){
    // factory creates 1 cohort (named cohortName) with 20 heroes (named namePrefix[0-19])
    // each hero receives 1 interview and 5 interview questions
        QCHubDataFactory.dataFactory('cohortName', 'namePrefix');
    }

    // tests all methods in the QCInterviewHeroReviewAuraController class
    @isTest
    static void heroReviewTest() {

        //creates params for input into getInterview method
        Cohort__c c = [SELECT Id FROM Cohort__c WHERE Name='cohortName' LIMIT 1];
        Account a = [SELECT Id FROM Account WHERE Name='namePrefix5' LIMIT 1];

        //executes getInterview method, with system.asserts to verify
        QC_Interview__c qci = QCInterviewHeroReviewAuraController.getInterview(c, a);

        System.assertEquals(c.Id, qci.Cohort__c);
        System.assertEquals('namePrefix5QC namePrefix', qci.Name);
        System.assert(qci.Finalized__c != true);

        // executes setInterview method, with system.asserts to verify
        QCInterviewHeroReviewAuraController.setInterview(qci);

        System.assert(qci.Finalized__c == true);

        //creates 5 flags for insertion
        List<QC_Flag__c> flags = new List<QC_Flag__c>();
        for (Integer i=0 ; i<5 ; i++ ) {
            QC_Flag__c f = new QC_Flag__c(Name='flag '+i, Description__c='genericDescription'+i, QC_Interview__c=qci.Id);
            flags.add(f);
        }

        // executes setFlags method, with system.asserts to verify
        QCInterviewHeroReviewAuraController.setFlags(flags);

        QC_Flag__c check = [SELECT Name, QC_Interview__c FROM QC_Flag__c WHERE Name='flag 3' LIMIT 1];

        System.assertEquals('flag 3', check.Name);
        System.assertEquals(qci.Id, check.QC_Interview__c);
    }

}