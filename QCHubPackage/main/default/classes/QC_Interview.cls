public with sharing class QC_Interview {

     /* public static QC_Hub_Wrapper getQC_Weeks(String weekId){ */
    @AuraEnabled
    public static QCInterviewWrapper getQCWeeks(String cohortStr){

            Schema.DescribeSObjectResult acctDesc = Account.SObjectType.getDescribe();
            Map<String, Schema.RecordTypeInfo> acctRecTypeMap = acctDesc.getRecordTypeInfosByName();
            Id heroTypeId = acctRecTypeMap.get('Hero').getRecordTypeId();

            Cohort__c cohort = (Cohort__c) JSON.deserialize(cohortStr, Cohort__c.class);
            
            List<Account> weekList =  [SELECT Name, QC_Interview__r.Week__c FROM Account WHERE RecordTypeId=:heroTypeId AND Cohort__r.Name=:cohort.Name];

            Map<String, List<Account>> squadMap = new Map<String, List<Account>>();

            for (Account hero : weekList){
                String currentHeroSquad = hero.Squad__r.Name;
                if (squadMap.containsKey(currentHeroSquad)){
                    squadMap.get(currentHeroSquad).add(hero);
                }
                else (squadMap.put(hero.Squad__r.Name, new List<Account>{hero}));
    
            }
            QCInterviewWrapper cohortData = new QCInterviewWrapper();
            cohortData.cohort = cohort;
            cohortData.squadList = squadMap;
    
            return cohortData;

            }
            @AuraEnabled
            public static QC_Interview__c saveQC_Iterview(QC_Interview__c interview){
                // Perform isUpdateable() checking first, then
                insert interview;
                return interview;
                }
    }

/*
    public class QC_Hub_Wrapper{
        public QC_Interview__c weeks {get;set;}
    
        public QC_Hub_Wrapper (QC_Interview__c myweeks){
            weeks = myweeks;
        }
    }
    public Map<Id, QC_Hub_Wrapper> selectedWeek {
        get {
            if (selectedWeek == null) {
                selectedWeek = new Map<Id, QC_Hub_Wrapper>();
            }
            return selectedWeek;
        }
        private set;
    } */


/* 
@AuraEnabled
    public static List<QC_Interview__c> getQC_Interview(){
   // Check to make sure all fields are accessible to this user
   String[] fieldsToCheck = new String[] {
    'Name', 'Week__c', 'QC_Score__c' , 'Finalized__c', 'Cohort__c'
    };
    Map<String,Schema.SObjectField> fieldDescribeTokens = Schema.SObjectType.QC_Interview__c.fields.getMap();
    for(String field : fieldsToCheck) {
        //if( ! fieldDescribeTokens.get(field).getDescribe().isAccessible()) {
            if( field != null && fieldDescribeTokens != null && fieldDescribeTokens.get(field) != null &&
            fieldDescribeTokens.get(field).getDescribe() != null &&
            fieldDescribeTokens.get(field).getDescribe().isAccessible() != null &&
            !fieldDescribeTokens.get(field).getDescribe().isAccessible()) {
                throw new System.NoAccessException();
                }
            }
    return [SELECT Name, Week__c, QC_Score__c, Finalized__c, Cohort__c FROM QC_Interview__c];
    }     */