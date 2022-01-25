public without sharing class updatedSquadLeaderboardHandler 
{
    @AuraEnabled(cacheable=true)
    public static List<Account> getUpdatedScore() 
    {
        Contact con = [SELECT AccountId FROM Contact WHERE Email = :UserInfo.getUserEmail()];

        Account objAccount = new Account();
        objAccount = [SELECT Name, Squad__r.Name, Id FROM Account WHERE Id = :con.AccountId];

        return [SELECT Name, Weekly_Arete_Number__c, Team__r.Name, Squad__r.Name FROM Account 
        WHERE Squad__r.Name = :objAccount.Squad__r.Name ORDER BY Weekly_Arete_Number__c DESC LIMIT 3];
    }
}
