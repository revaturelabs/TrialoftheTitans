//////////////////////////////////////////////////////////////////////
//
// Name: updatedSquadLeaderboardHandler
// Author: Tobias Diaz, Raksha Jha
// Created: 1/20/22
// Last Updated: 1/25/22
// Description: The handler for our updatedSquadLeaderboard.
// 
//////////////////////////////////////////////////////////////////////

public without sharing class updatedSquadLeaderboardHandler 
{
    @AuraEnabled(cacheable=true)
    public static List<Account> getUpdatedScore() 
    {
        //This retrieves the Contact email that is associated with the currently logged in user
        Contact con = [SELECT AccountId FROM Contact WHERE Email = :UserInfo.getUserEmail()];

        //Now we retireve the squad that this account belongs to.
        Account objAccount = new Account();
        objAccount = [SELECT Name, Squad__r.Name, Id FROM Account WHERE Id = :con.AccountId];

        /*Finally, we create and return a query on the Account object that retrieves the top three accounts that 
        belong to the same squad the user is in with the highest arete.*/
        return [SELECT Name, Weekly_Arete_Number__c, Team__r.Name, Squad__r.Name FROM Account 
        WHERE Squad__r.Name = :objAccount.Squad__r.Name ORDER BY Weekly_Arete_Number__c DESC LIMIT 3];
    }
}
