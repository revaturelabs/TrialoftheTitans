public with sharing class TestDataClass {

    @AuraEnabled(cacheable=true)
    public static List<Titan__c> retrieveTitans() {

        
    
        return
        [SELECT Curriculum__c, Name, Curriculum__r.Name
        FROM Titan__c
        ];





    }

    @AuraEnabled(cacheable=true)
    public static List<Category__c> retrieveCategories() {
        
        return 
        [SELECT Name, 
        (SELECT Name, Skill_Number__c FROM Custom_Skills__r) 
        FROM Category__c];

    }

    
}
