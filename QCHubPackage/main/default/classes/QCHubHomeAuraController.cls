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


    // Method fired from QCHubHome Init event - retrieves data about active cohorts
    @AuraEnabled
    public static List<Cohort__c> RetrieveCohorts(){
        
        return [SELECT Id, Name, QC_Interview_Sum__c, QC_Interview_Count__c FROM Cohort__c WHERE Active__c = true];

    }
    /*
    public List<QCCohortWrapper> CohortsInit() {
        List<QCCohortWrapper> activeCohorts = new List<QCCohortWrapper>();

    }
    */


    // Method fired from QCHubHome UpdateCohortEvent event (fired by CohortButtons when a cohort button is pressed);
    // retrieves detailed data about a specific cohort.
    @AuraEnabled
    public static QCCohortWrapper RetrieveCohortData(String cohortStr){
    // QCCohortWrapper contains the following properties: Cohort__c cohort, Map<String, List<Account>> squadMap, and
    // List<QCSquadWrapper> squadList. squadMap (initialized with the above map) probably will not be necessary in the
    // aura component, but is included for now.
    // QCSquadWrapper contains: Squad__c squad, and List<Account> heroes.
    // Overall, cohortData is a QCCohortWrapper type object that stores the cohort that is currently selected,
    // and a list of QCSquadWrapper objects to store each squad in the cohort, and a list of heroes in that squad.
    // It is initialized below.

        // Get 'Hero' record type Id to retrieve Hero accounts only
        Schema.DescribeSObjectResult acctDesc = Account.SObjectType.getDescribe();
		Map<String, Schema.RecordTypeInfo> acctRecTypeMap = acctDesc.getRecordTypeInfosByName();
		Id heroTypeId = acctRecTypeMap.get('Hero').getRecordTypeId();

        // Cohort object is passed in as a JSON string, deserialized into Cohort__c sObject type here
        Cohort__c cohort = (Cohort__c) JSON.deserialize(cohortStr, Cohort__c.class);

        // Retrieve all heroes in the selected cohort
        List<Account> heroList = [SELECT Name, Squad__r.Name, Squad__r.Id, Team__r.Name FROM Account WHERE RecordTypeId=:heroTypeId AND Cohort__r.Name=:cohort.Name];

        // squadMap is initialized to hold a list of all heroes for each squad name key, and is
        // used to sort Heroes in a cohort into squads
        Map<String, List<Account>> squadMap = new Map<String, List<Account>>();

        for (Account hero : heroList){
            String currentHeroSquad = hero.Squad__r.Name;
            if (squadMap.containsKey(currentHeroSquad)){
                squadMap.get(currentHeroSquad).add(hero);

            }
            else (squadMap.put(hero.Squad__r.Name, new List<Account>{hero}));

        }

        QCCohortWrapper cohortData = new QCCohortWrapper();
        cohortData.cohort = cohort;
        cohortData.squadMap = squadMap;

        System.debug(squadMap);
        System.debug(squadMap.keySet());

        List<Squad__c> squads = [SELECT Id, Name, Team__r.Name FROM Squad__c WHERE Name IN :squadMap.keySet()];

        System.debug(squads);

        cohortData.squadList = new List<QCSquadWrapper>();

        for (Squad__c s : squads){
            cohortData.squadList.add(new QCSquadWrapper(s));
        }
        for (QCSquadWrapper squadListElement : cohortData.squadList){
            squadListElement.heroes = squadMap.get(squadListElement.squad.Name);
        }

        System.debug(cohortData);
        System.debug(cohortData.squadList);
        System.debug(cohortData.squadList[0].squad.Name);

        return cohortData;

    }
}