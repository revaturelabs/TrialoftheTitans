public without sharing class updatedTeamLeaderboardHandler {
    
    @AuraEnabled(cacheable=true)
    public static List<AggregateResult> getWeeksWon()
    {
        return [SELECT Winning_Squad__r.Team__r.Name Team, COUNT(Winning_Squad__c) Weeks_Won FROM Cohort_Week__c 
        GROUP BY Winning_Squad__r.Team__r.Name ORDER BY COUNT(Winning_Squad__c) DESC LIMIT 3];
    }
}
