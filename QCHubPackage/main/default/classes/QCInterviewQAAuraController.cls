public with sharing class QCInterviewQAAuraController {
    public QCInterviewQAAuraController() {

    }

    @AuraEnabled
    public static List<QC_Question__c> getQuestion(List<String> Decks){


        List<QC_Question__c> TotalQuestionDeck = [ SELECT Name, QC_Question_Deck__c, Expected_Answer__c, Question_body__c 
                                                    FROM QC_Question__c WHERE QC_Question_Deck__r.Name in :Decks];

        return TotalQuestionDeck;
            // we will be recieving a question deck, list of names, use this in the soql query, 
            //extract each question in this method and add then to a returned list of questions

            // if question deck is required for question manipulation change returned list to list of question pools
            




    }

}
