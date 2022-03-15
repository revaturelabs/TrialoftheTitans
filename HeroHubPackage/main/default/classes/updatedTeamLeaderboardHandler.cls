//////////////////////////////////////////////////////////////////////
//
// Name: updatedSquadLeaderboardHandler
// Author: Tobias Diaz, Raksha Jha
// Created: 1/20/22
// Last Updated: 1/25/22
// Description: The handler for our updatedTeamLeaderboard.
// 
//////////////////////////////////////////////////////////////////////

public without sharing class updatedTeamLeaderboardHandler {
    
    @AuraEnabled(cacheable=true)
    public static List<AggregateResult> getWeeksWon()
    {
        /*Unlike the other leaderboards, we don't care who the logged in user is for the team leaderboard.
        Here, we're making a query to a Cohort Week custom object That gets a name of the top 3 winning squads from
        all cohorts and arranges the results from highest to lowest winning squad score.*/
        return [SELECT Winning_Squad__r.Team__r.Name Team, COUNT(Winning_Squad__c) Weeks_Won FROM Cohort_Week__c 
        GROUP BY Winning_Squad__r.Team__r.Name ORDER BY COUNT(Winning_Squad__c) DESC LIMIT 3];
    }
}
