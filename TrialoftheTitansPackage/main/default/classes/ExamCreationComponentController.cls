public with sharing class ExamCreationComponentController {
   @AuraEnabled(cacheable=true)
   public static List<Titan__c> getTitan(){
        return [SELECT Id, Name FROM Titan__c];
   }

   @AuraEnabled
   public static List<Exam__c> getExam(){
       return [SELECT Id, Name From Exam__c];
   }
    
}