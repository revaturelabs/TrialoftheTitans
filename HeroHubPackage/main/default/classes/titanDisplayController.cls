public with sharing class titanDisplayController {

    @AuraEnabled
    public static Map<String, List<Titan__c>> getTitans(){
        List<Titan__c> titans = [SELECT Name, Technology__c, Curriculum__c, First_Exam__c, Number_of_Skills__c, Required_Titan__c FROM Titan__c];

        Map<String, List<Titan__c>> dependentMap = new Map<String, List<Titan__c>>();

        for(Titan__c titan: titans) {
            List<Titan__c> dependents = [SELECT Name, Required_Titan__c
                                         FROM Titan__c
                                         WHERE Required_Titan__c =: titan.Id];
            
            dependentMap.put(titan.Name, dependents);
        }
        return dependentMap;
    }

    @AuraEnabled
    public static Account getCurrentUser(){
        // User user = [SELECT Id, contactId FROM User WHERE Id = :UserInfo.getUserId()];
        // Contact contact = [SELECT Id, AccountId FROM Contact WHERE Id = :user.contactId];
        // Account userAccount = [SELECT Id, Name, Squad__c, Team__c, Cohort__c, Curriculum__c FROM Account WHERE Id = :contact.AccountId];
        // return userAccount;
        return [SELECT Id, Name, Squad__c, Team__c, Cohort__c, Curriculum__c FROM Account WHERE Name = 'Peter Parker'];
    }

    @a
}