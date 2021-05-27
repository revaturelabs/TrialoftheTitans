/////////////////////////////////////////////////////
//
//  Name: HeroHubController
//  Author: Josh Miccolo
//  Created: 5/23/2021
//  Updated: 5/25/2021
//  Description: Hero Hub Main Page Component Controller
//  sends User context, and team scores.
//  
//
///////////////////////////////////////////////////
public with sharing class HeroHubController {
    
    @AuraEnabled
    public static UserContextInfo getUserInfo(){
        try {
            
            //user will become userContextInfo in js Controller; 
            //UserContextInfo class builds the javascript object necessary for parsing
            UserContextInfo user = new UserContextInfo(UserInfo.getUserId());
            
            return user; 

        } catch ( Exception e ) {

            system.debug(e);
            throw new AuraHandledException(e.getMessage());
        
        }
    }
    
    @AuraEnabled
    public static Map<String, Map<String, Decimal>> getTeamScores(){
        
        Account userAcc = UserContextInfo.getUserAccount(UserInfo.getUserId());
        
        Map<String, Map<String, Decimal>> scores = new Map<String, Map<String, Decimal>>();
        
        List<AggregateResult> teamScores = [SELECT SUM(Total_Answers__C) answers, SUM(Total_Correct__C) correct, Account__r.Team__r.Name teamName FROM Exam_Result__c GROUP BY Account__r.Team__r.Name];
        
        Map<String, Decimal> scoresByTeam = new Map<String, Decimal>();
        
        for(AggregateResult score: teamScores){
            
            Decimal correct = (Decimal)score.get('correct');
            Decimal answers = (Decimal)score.get('answers');
            
            scoresByTeam.put((String)score.get('teamName'), ((Decimal)(correct/answers)).setScale(2));
            
        }
        
        scores.put('Team', scoresByTeam);
        
        List<AggregateResult> cohortScores = [SELECT SUM(Total_Answers__C) answers, SUM(Total_Correct__C) correct, Account__r.Team__R.Name teamName, Account__r.Cohort__c FROM Exam_Result__c WHERE Account__r.Cohort__c = :userAcc.Cohort__c GROUP BY Account__r.Cohort__c, Account__r.Team__r.Name];
        
        system.debug(cohortScores);
        
        Map<String, Decimal> scoresByCohort = new Map<String, Decimal>();
        
        for(AggregateResult score: cohortScores){
            
            Decimal correct = (Decimal)score.get('correct');
            Decimal answers = (Decimal)score.get('answers');
            
            scoresByCohort.put((String)score.get('teamName'), ((Decimal)(correct/answers)).setScale(2));
            
        }
        
        scores.put('Cohort', scoresByCohort);
        
        
        List<AggregateResult> squadScores = [SELECT SUM(Total_Answers__C) answers, SUM(Total_Correct__C) correct, Account__r.Squad__r.Name squadName, Account__r.Team__c FROM Exam_Result__c WHERE Account__r.Team__c = :userAcc.Team__c GROUP BY Account__r.Team__c, Account__r.Squad__r.Name];
        
        system.debug('Squad Scores: ' + squadScores);
        
        Map<String, Decimal> scoresBySquad = new Map<String, Decimal>();
        
        for(AggregateResult score: squadScores){
            
            Decimal correct = (Decimal)score.get('correct');
            Decimal answers = (Decimal)score.get('answers');
           	String name = (String)score.get('squadName');
            scoresBySquad.put(name, ((Decimal)(correct/answers)).setScale(2));
            
        }
        
        scores.put('Squad', scoresBySquad);
        system.debug(scores);
        return scores;
    }
}