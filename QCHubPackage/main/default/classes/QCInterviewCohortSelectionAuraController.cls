/////////////////////////////////////////////////////
//
//  Name: QCInterviewCohortSelection
//  Author: Natalie Clark
//  Description: Aura component segment meant for reference
//  to be displayed on selection of Cohort from Hub page in aura:if
//
///////////////////////////////////////////////////

public with sharing class QCInterviewCohortSelectionAuraController {


    @AuraEnabled
    public static List<Cohort__c> DoInit(){
        try {
            List<Cohort__c> c = [SELECT Id, Name FROM Cohort__c];

            return c;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }


    @AuraEnabled
    public static List<Account> getHeroList(){
        try {
            List<Account> h = [SELECT Id, Name FROM Account WHERE RecordType.Name='Hero'];

            return h;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

}
