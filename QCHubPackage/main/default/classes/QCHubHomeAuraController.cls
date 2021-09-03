//////////////////////////////////////////////////////////////////////
//
//  Name: QCHubHomeAuraController
//  Author: Alexander Dzhitenov, Andrew Furr
//  Description: Controller for the QCHubHome Aura Component
//
//////////////////////////////////////////////////////////////////////


public with sharing class QCHubHomeAuraController {


    // Apex controller method fired from QCHubHome Init event - retrieves data about active cohorts
    @AuraEnabled
    public static List<Cohort__c> RetrieveCohorts(){
        
        return [SELECT Id, Name, QC_Interview_Sum__c, QC_Interview_Count__c FROM Cohort__c WHERE Active__c = true];

    }

    // Return the global picklist value set of weeks used in the org
    @AuraEnabled
    public static List<String> RetrieveWeeks(){
        System.debug(QC_Interview__c.Week__c.getDescribe().getPicklistValues());

        List<String> weekList = new List<String>();
        List<Schema.PicklistEntry> pickValues = QC_Interview__c.Week__c.getDescribe().getPicklistValues();
        for (Schema.PicklistEntry pickVal : pickValues){
            System.debug(pickVal.getValue());
            weekList.add(pickVal.getValue());
        }
        System.debug(weekList);
        return weekList;
    }
    
    @AuraEnabled
    public static List<Account> HeroList() {

        // Get 'Hero' record type Id to retrieve Hero accounts only
        Schema.DescribeSObjectResult acctDesc = Account.SObjectType.getDescribe();
		Map<String, Schema.RecordTypeInfo> acctRecTypeMap = acctDesc.getRecordTypeInfosByName();
		Id heroTypeId = acctRecTypeMap.get('Hero').getRecordTypeId();

        List<Account> heroList = [SELECT Name, Squad__r.Name, Squad__r.Id, Team__r.Name, Cohort__r.Name, Curriculum__r.Name FROM Account WHERE RecordTypeId=:heroTypeId];
        return heroList;
    }

    
    // Apex controller method fired from QCHubHome UpdateCohortEvent event - retrieves detailed data about a
    // single cohort.
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

        // Initialize the QCCohortWrapper object that will be used to pass data back to the component's JS controller,
        // and begin populating it with values
        QCCohortWrapper cohortData = new QCCohortWrapper();
        cohortData.cohort = cohort;
        cohortData.squadMap = squadMap;
        cohortData.heroList = heroList;

        /* NOTE:    This is an option, and the corresponding code can be re-enabled in QCCohortWrapper to populate this
                    variable (it matches heroes to squads by putting a squad, and a list of the heroes in it, into a wrapper class).
                    However, it might be substantially easier (and better) to just use a map between squads and accounts,
                    similar to the one above, to split heroes into squads wherever it's necessary.
        List<Squad__c> squads = [SELECT Id, Name, Team__r.Name FROM Squad__c WHERE Name IN :squadMap.keySet()];

        cohortData.squadList = new List<QCSquadWrapper>();

        // Populate cohortData's squadList with the squads that are in the selected cohort
        for (Squad__c s : squads){
            cohortData.squadList.add(new QCSquadWrapper(s));
        }
        // Populate each QCSquadWrapper object in squadList with a list of the heroes that are in that squad,
        // using squadMap from above
        for (QCSquadWrapper squadListElement : cohortData.squadList){
            squadListElement.heroes = squadMap.get(squadListElement.squad.Name);
        }
        */
        return cohortData;

    }
}