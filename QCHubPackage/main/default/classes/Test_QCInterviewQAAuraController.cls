//////////////////////////////////////////////////////////////////////
//
//  Name: Test_QCInterviewHereReviewAuraController
//  Author: Natalie Clark
//  Description:    Tests the following Apex classes:
//                  QCInterviewQAAuraController
//
//////////////////////////////////////////////////////////////////////
@isTest
public class Test_QCInterviewQAAuraController {
    @TestSetup
    static void makeData(){
    // factory creates 1 cohort (named cohortName) with 20 heroes (named namePrefix[0-19])
    // each hero receives 1 interview and 5 interview questions
        QCHubDataFactory.dataFactory('cohortName', 'namePrefix');

        //updates Week__c field for all interviews
        //delete below if QCHubDataFactory is refactored to include Week__c
        List<QC_Interview__c> interviews = [SELECT Id FROM QC_Interview__c];
        for (Integer i=0 ; i<interviews.size() ; i++) {
            interviews[i].Week__c = 'Week 1';
            interviews[i].QC_Score__c = 4;
        }
        update interviews;

        //create question deck and questions for getQuestion method testing
        QC_Question_Deck__c qd = new QC_Question_Deck__c(Name='Sligh', Week__c='Week 1');
        insert qd;

        List<QC_Question__c> qcq = new List<QC_Question__c>();
        for (Integer i=0 ; i<5 ; i++) {
            QC_Question__c q = new QC_Question__c(Name = 'questionName',
                                                QC_Question_Deck__c = qd.Id,
                                                Expected_Answer__c = 'expectedAnswer',
                                                Question_Body__c = 'questionBody');
            qcq.add(q);
        }
        insert qcq;
    } 

    // tests all methods in the QCInterviewQAAuraController class
    @isTest
    static void heroReviewTest() {
        //creates params for input into CreateInterview method and getQuestion method
        QC_Interview__c i = [SELECT Account__c, Account__r.Name, Cohort__c, Week__c FROM QC_Interview__c WHERE Account__r.Name='namePrefix9' LIMIT 1];
        List<String> decks = new List<String>();
        decks.add('Sligh');
        decks.add('Tricks');
        QC_Question_Deck__c deckQuery = [SELECT Id FROM QC_Question_Deck__c WHERE Name=:decks[0] LIMIT 1];

        //creation of a QC_Question_Answer__c object for testing of InsertQAData
        QC_Question_Answer__c qa = new QC_Question_Answer__c(Question__c='question', Hero_Answer__c='answer', Score__c=5);
        String str = JSON.serialize(qa);

        //executes CreateInterview method, with system.asserts to verify
        QC_Interview__c qci = QCInterviewQAAuraController.CreateInterview(i.Account__c, i.Account__r.Name, i.Cohort__c, i.Week__c);

        System.assertEquals(i.Account__c, qci.Account__c);
        System.assertEquals(i.Cohort__c, qci.Cohort__c);
        System.assertEquals('namePrefix9 Week 1', qci.Name);

        //executes InsertQAData method, with system.asserts to verify
        QCInterviewQAAuraController.InsertQAData(qci.Id, str);
        QC_Question_Answer__c check = [SELECT Question__c, QC_Interview__c FROM QC_Question_Answer__c WHERE Question__c='question'];

        System.assertEquals(qci.Id, check.QC_Interview__c);
        System.assert(check!=null);

        //executes getQuestion method, with system.asserts to verify
        /*List<QC_Question__c> questions = QCInterviewQAAuraController.getQuestion(decks);

        System.assertEquals(deckQuery.Id, questions[0].QC_Question_Deck__c);*/
    }

}