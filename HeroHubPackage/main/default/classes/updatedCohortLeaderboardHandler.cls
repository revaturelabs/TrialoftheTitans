public without sharing class updatedCohortLeaderboardHandler {
    @AuraEnabled(cacheable=true)
    public static List<AggregateResult> getUpdatedCohortScore() 
    {
        Contact con = [SELECT AccountId FROM Contact WHERE Email = :UserInfo.getUserEmail()];

        Account objAccount = new Account();
        objAccount = [SELECT Name, Cohort__r.Name, Id FROM Account WHERE Id = :con.AccountId];

        return [SELECT Cohort__r.Name C, Team__r.Name, AVG(Weekly_Arete_Number__c) Average_Score, Squad__r.Name squad_name FROM Account 
        WHERE Cohort__r.Name = :objAccount.Cohort__r.Name GROUP BY Team__r.Name, Cohort__r.Name, Squad__r.Name
        ORDER BY AVG(Weekly_Arete_Number__c) DESC LIMIT 3];
    }
}
