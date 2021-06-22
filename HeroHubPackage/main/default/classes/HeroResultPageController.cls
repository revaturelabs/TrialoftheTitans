public with sharing class HeroResultPageController {
    @AuraEnabled
    public static List<Exam_Result__c> getResultList(){
        return [SELECT Id, Exam__r.Titan__r.Name, Account__r.Name, Exam__r.Name, Score__c, Total_Correct__c, Total_Answers__c, Pass__c FROM Exam_Result__c WHERE Account__r.Name = 'Gladius Maximus'];
    }
}
