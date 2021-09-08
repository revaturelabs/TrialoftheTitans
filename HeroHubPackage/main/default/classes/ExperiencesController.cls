public with sharing class ExperiencesController {
    @AuraEnabled
    public static List<Experience__c> getExperiences(){
        List<Experience__c> experiences = new List<Experience__c>();

        for(Integer i = 0; i < 6; i++){
            experiences.add(new Experience__c(
                Account__c='0015f000003TiLSAA0',
                Company__c='Test Company ' + i,
                Position__c='Tester',
                Start_Date__c= Date.valueOf('2011-11-11'),
                End_Date__c= Date.today()
            ));
        }
        
        /*List<Experience__c> experiences = [SELECT Id, Company__c, Position__c, Start_Date__c, End_Date__c 
                                        FROM Experience__c];

        if(experiences == null){
            
        }*/

        return experiences;
    }
}
