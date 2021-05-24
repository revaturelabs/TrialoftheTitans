public with sharing class HeroHubUtilities {

    public static Account getUserAccount() {

            Id userId = UserInfo.getUserId();
            Account userAccount = [SELECT Id, Name, (SELECT Id, Name, Birthdate FROM Contacts) FROM Account WHERE Id = :userId];
            return userAccount;
        
    }
}
