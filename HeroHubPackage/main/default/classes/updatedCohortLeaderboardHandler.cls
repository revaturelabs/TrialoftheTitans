//////////////////////////////////////////////////////////////////////
//
// Name: updatedCohortLeaderboardHandler
// Author: Tobias Diaz, Raksha Jha
// Created: 1/20/22
// Last Updated: 1/25/22
// Description: The handler for our updatedCohortLeaderboard
// 
//////////////////////////////////////////////////////////////////////

public without sharing class updatedCohortLeaderboardHandler {
    @AuraEnabled(cacheable=true)
    public static List<AggregateResult> getUpdatedCohortScore() 
    {
        //This retrieves the Contact email that is associated with the currently logged in user
        Contact con = [SELECT AccountId FROM Contact WHERE Email = :UserInfo.getUserEmail()];

        //Now we retireve the cohort that this account belongs to.
        Account objAccount = new Account();
        objAccount = [SELECT Name, Cohort__r.Name, Id FROM Account WHERE Id = :con.AccountId];

        /*Finally, we create and return a query on the Account object that retrieves the cohort, team, and an average
        of all weekly arete. We then compare all cohorts in the database with the cohort the logged in user is part of,
        and group our results by team name and cohort name. We need to group by both otherwise an error is thrown.
        This gives us the top three highest scoring teams within the user's cohort.*/
        return [SELECT Cohort__r.Name C, Team__r.Name, AVG(Weekly_Arete_Number__c) Average_Score, Squad__r.Name squad_name FROM Account 
        WHERE Cohort__r.Name = :objAccount.Cohort__r.Name GROUP BY Team__r.Name, Cohort__r.Name, Squad__r.Name
        ORDER BY AVG(Weekly_Arete_Number__c) DESC LIMIT 3];
    }
}
