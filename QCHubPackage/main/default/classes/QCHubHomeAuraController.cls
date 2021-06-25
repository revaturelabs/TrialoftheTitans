//////////////////////////////////////////////////////////////////////
//
//  Name: QCHubHomeAuraController
//  Author: Alexander Dzhitenov
//  Description: Controller for the QCHubHome Aura Component
//
//////////////////////////////////////////////////////////////////////


public with sharing class QCHubHomeAuraController {

    /*
    //Each QCCohortWrapper entry needs 
    private static QCCohortWrapper processQCDataEntry(Account Hero, ){

    }

    @AuraEnabled
    public static List<QCCohortWrapper> RetrieveQCData(){

        List<QCCohortWrapper> qcData = new List<QCCohortWrapper>();
        List<Cohort__c> cohorts = [SELECT Id, Name FROM Cohort__c WHERE Active__c = true];


        //Populate qcData with active cohorts; add squads, heroes, and qc scores for each cohort afterwards
        for (Cohort__c c : cohorts){
            QCCohortWrapper newData = new QCCohortWrapper();
            newData.cohort = c;
            newData.squadList = new Map<String, List<Account>>();
            qcData.add(newData);
        }

		Id heroTypeId = Account.SObjectType.getDescribe().getRecordTypeInfosByName().get('Hero').getRecordTypeId;

        //Cohort__c cohort = (Cohort__c) JSON.deserialize(cohortStr, Cohort__c.class);
        for (Account hero: [SELECT Name, Squad__r.Name, Team__r.Name, Cohort__c, (SELECT Week__c, QC_SCore__c FROM QC_Interviews__r ORDER BY Week__c) FROM Account WHERE RecordTypeId=:heroTypeId]){
            for (QCCohortWrapper dataEntry : qcData){
                if (hero.Cohort__c == dataEntry.cohort.Id){

                    for (Account hero : heroList){
                        if (dataEntrysquadList.get(hero.Squad__r.Name) != NULL){
                            squadList.get(hero.Squad__r.Name).add(hero);
            
                        }
                        else (squadList.put(hero.Squad__r.Name, new List<Account>{hero}));
            
                    }

                }

            }

        }
        
        


        QCCohortWrapper cohortData = new QCCohortWrapper();
        cohortData.cohort = cohort;
        cohortData.squadList = squadList;
    }
    */


    @AuraEnabled
    public static List<Cohort__c> RetrieveCohorts(){
        
        return [SELECT Id, Name, QC_Interview_Sum__c, QC_Interview_Count__c FROM Cohort__c WHERE Active__c = true];

    }
    /*
    public List<QCCohortWrapper> CohortsInit() {
        List<QCCohortWrapper> activeCohorts = new List<QCCohortWrapper>();

    }
    */
    @AuraEnabled
    public static QCCohortWrapper RetrieveCohortData(String cohortStr){

        Schema.DescribeSObjectResult acctDesc = Account.SObjectType.getDescribe();
		Map<String, Schema.RecordTypeInfo> acctRecTypeMap = acctDesc.getRecordTypeInfosByName();
		Id heroTypeId = acctRecTypeMap.get('Hero').getRecordTypeId();

        Cohort__c cohort = (Cohort__c) JSON.deserialize(cohortStr, Cohort__c.class);
        List<Account> heroList = new List<Account>([SELECT Name, Squad__r.Name, Team__r.Name FROM Account WHERE RecordTypeId=:heroTypeId AND Cohort__r.Name=:cohort.Name]);
        Map<String, List<Account>> squadList = new Map<String, List<Account>>();

        for (Account hero : heroList){
            if (squadList.get(hero.Squad__r.Name) != NULL){
                squadList.get(hero.Squad__r.Name).add(hero);

            }
            else (squadList.put(hero.Squad__r.Name, new List<Account>{hero}));

        }

        QCCohortWrapper cohortData = new QCCohortWrapper();
        cohortData.cohort = cohort;
        cohortData.squadList = squadList;

        return cohortData;
    }
}