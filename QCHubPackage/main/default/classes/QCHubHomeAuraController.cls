//////////////////////////////////////////////////////////////////////
//
//  Name: QCHubHomeAuraController
//  Author: Alexander Dzhitenov
//  Description: Controller for the QCHubHome Aura Component
//
//////////////////////////////////////////////////////////////////////


public with sharing class QCHubHomeAuraController {

    @AuraEnabled
    public static List<Cohort__c> RetrieveCohorts(){
        return [SELECT Id, Name FROM Cohort__c WHERE Active__c = true];
    }
    /*
    public List<QCCohortWrapper> CohortsInit() {
        List<QCCohortWrapper> activeCohorts = new List<QCCohortWrapper>();

    }
    */
    @AuraEnabled
    public static QCCohortWrapper RetrieveCohortData(String cohortStr){

        System.debug('UNIQUE IDENTIFIER ADZHITENOV');

        Schema.DescribeSObjectResult acctDesc = Account.SObjectType.getDescribe();
		Map<String, Schema.RecordTypeInfo> acctRecTypeMap = acctDesc.getRecordTypeInfosByName();
		Id heroTypeId = acctRecTypeMap.get('Hero').getRecordTypeId();

        System.debug(heroTypeId);

        System.debug(cohortStr);

        Cohort__c cohort = (Cohort__c) JSON.deserialize(cohortStr, Cohort__c.class);

        System.debug(cohort);

        List<Account> heroList = new List<Account>([SELECT Name, Squad__r.Name, Team__r.Name FROM Account WHERE RecordTypeId=:heroTypeId AND Cohort__r.Name=:cohort.Name]);

        System.debug(heroList);

        // Map squad objects to a list of the heroes in that squad

        //Map<Squad__c, List<Account>> squadList = new Map<Squad__c, Account>();
        Map<String, List<Account>> squadList = new Map<String, List<Account>>();

        for (Account hero : heroList){
            if (squadList.get(hero.Squad__r.Name) != NULL){
                squadList.get(hero.Squad__r.Name).add(hero);
            }
            else (squadList.put(hero.Squad__r.Name, new List<Account>{hero}));
        }

        System.debug(squadList);

        QCCohortWrapper cohortData = new QCCohortWrapper();
        cohortData.cohort = cohort;
        cohortData.squadList = squadList;

        System.debug(cohortData);

        return cohortData;
    }
}