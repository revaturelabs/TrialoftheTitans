//////////////////////////////////////////////////////////////////////
//
//  Name: QCInterviewQAAuraController
//  Author: Alexander Dzhitenov and ???
//  Description: Controller for the QCInterview Aura Component
//
//////////////////////////////////////////////////////////////////////


public with sharing class QCInterviewQAAuraController {

    // Create a new interview with current data, then return it to the component so that its ID
    // is known when answers are uploaded to the database (we do this each time a question is
    // answered, to minimize risk of data loss)
    @AuraEnabled 
    public static QC_Interview__c CreateInterview(Id heroId, String heroName, String cohortId, String week){
        // System.debug(cohortId);
        QC_Interview__c newInterview = new QC_Interview__c(Account__c=heroId, Cohort__c=cohortId, Name=heroName + ' ' + week);
        // System.debug('Account: ' + heroId);
        // System.debug('Cohort: ' + cohortId);
        // System.debug('Hero Name: ' + heroName);
        // System.debug('Week: ' + week);
        //insert newInterview;
        // System.debug('NEW INTERVIEW INSERTED FROM AURA CONTROLLER');

        //QC_Interview__c newInterview = new QC_Interview__c(Account__c=heroId, Cohort__c=cohortId, Name=heroName + ' ' + week);
        insert newInterview;

        return newInterview;
    }


    // Add QA data each time a new question is loaded, to prevent data loss (if the app is exited or the window is closed
    // while a QC Interview is in progress, it wouldn't get saved otherwise)
    @AuraEnabled
    public static void InsertQAData(Id interviewId, String heroAnswerStr){
        System.debug('ahoy');
        System.debug(interviewId);
        System.debug(heroAnswerStr);

        System.debug(interviewId);
        System.debug(heroAnswerStr);
        QC_Question_Answer__c heroAnswer = (QC_Question_Answer__c) JSON.deserialize(heroAnswerStr, QC_Question_Answer__c.class);

        heroAnswer.QC_Interview__c = interviewId;
        insert heroAnswer;

    }


    @AuraEnabled
    public static List<QC_Question__c> getQuestion(List<String> Decks){

        List<QC_Question__c> TotalQuestionDeck = [ SELECT Name, QC_Question_Deck__c, Expected_Answer__c, Question_body__c 
                                                    FROM QC_Question__c WHERE QC_Question_Deck__r.Week__c in :Decks];
        return TotalQuestionDeck;
            // we will be recieving a question deck, list of names, use this in the soql query, 
            //extract each question in this method and add then to a returned list of questions

            // if question deck is required for question manipulation change returned list to list of question pools

    }

}
