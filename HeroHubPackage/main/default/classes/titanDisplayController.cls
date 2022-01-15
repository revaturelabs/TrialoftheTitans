public with sharing class titanDisplayController {

    @AuraEnabled
    public static List<Titan__c> getTitans(){
        return [SELECT Name, Technology__c, Curriculum__c, First_Exam__c, Number_of_Skills__c FROM Titan__c];
    }
}