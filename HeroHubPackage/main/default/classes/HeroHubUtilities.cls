public with sharing class HeroHubUtilities {

    public static Account getUserAccount(Id userId) {

            Id userContactId = [SELECT Id, ContactId FROM USER WHERE Id = :userId].ContactId;
            Contact userContact = [SELECT Id, AccountId, Name FROM Contact WHERE Id = :userContactId];
            Account userAccount = [SELECT Id, Name, Curriculum__c FROM Account WHERE Id = :userContact.AccountId];
            return userAccount;
    }
}
