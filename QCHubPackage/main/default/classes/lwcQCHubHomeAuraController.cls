//////////////////////////////////////////////////////////////////////
//
//  Name: QCHubHomeAuraController
//  Author: Alexander Dzhitenov
//  Description: Controller for the QCHubHome Aura Component
//
//////////////////////////////////////////////////////////////////////


public with sharing class lwcQCHubHomeAuraController {


    // Apex controller method fired from QCHubHome Init event - retrieves data about active cohorts
    @AuraEnabled(cacheable=true)
    public static List<Cohort__c> retrieveCohorts(){
        
        return [SELECT Id, Name, QC_Interview_Sum__c, QC_Interview_Count__c FROM Cohort__c WHERE Active__c = true];

    }

    // Return the global picklist value set of weeks used in the org
    @AuraEnabled(cacheable=true)
    public static List<String> retrieveWeeks(){
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

    
    // Apex controller method fired from QCHubHome UpdateCohortEvent event - retrieves detailed data about a
    // single cohort.
    
    @AuraEnabled(cacheable=true)
    public static QCCohortWrapper retrieveCohortData(String cohortStr){
    // QCCohortWrapper contains the following properties: Cohort__c cohort, Map<String, List<Account>> squadMap, and
    // List<QCSquadWrapper> squadList. squadMap (initialized with the above map) probably will not be necessary in the
    // aura component, but is included for now.
    // QCSquadWrapper contains: Squad__c squad, and List<Account> heroes.
    // Overall, cohortData is a QCCohortWrapper type object that stores the cohort that is currently selected,
    // and a list of QCSquadWrapper objects to store each squad in the cohort, and a list of heroes in that squad.
    // It is initialized below.

        Schema.DescribeSObjectResult acctDesc = Account.SObjectType.getDescribe();
		Map<String, Schema.RecordTypeInfo> acctRecTypeMap = acctDesc.getRecordTypeInfosByName();
		Id heroTypeId = acctRecTypeMap.get('Hero').getRecordTypeId();

        Cohort__c cohort = (Cohort__c) JSON.deserialize(cohortStr, Cohort__c.class);

        List<Account> heroList = [SELECT Name, Squad__r.Name, Squad__r.Id, Team__r.Name FROM Account WHERE RecordTypeId=:heroTypeId AND Cohort__r.Name=:cohort.Name];

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
        cohortData.heroList = heroList;

        List<Squad__c> squads = [SELECT Id, Name, Team__r.Name FROM Squad__c WHERE Name IN :squadMap.keySet()];

        cohortData.squadList = new List<QCSquadWrapper>();

        for (Squad__c s : squads){
            cohortData.squadList.add(new QCSquadWrapper(s));
        }

        for (QCSquadWrapper squadListElement : cohortData.squadList){
            squadListElement.heroes = squadMap.get(squadListElement.squad.Name);
        }
        
        return cohortData;

    }
}