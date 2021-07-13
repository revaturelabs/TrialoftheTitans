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
    
    //Method to return Team Scores in a Map of {Team:{Team: Score}, Cohort:{Team: Score}, Squad:{Squad: Score}}
    @AuraEnabled
    public static Map<String, Map<String, Decimal>> getTeamScores(){
        
        Account userAcc = UserContextInfo.getUserAccount(UserInfo.getUserId());
        
        Map<String, Map<String, Decimal>> scores = new Map<String, Map<String, Decimal>>();
        
        Map<String, Decimal> teamScores = getScoresByTeam();
        
        scores.put('Team', teamScores);
        
        Map<String, Decimal> cohortScores = getScoresByCohort( userAcc );
         
        scores.put('Cohort', cohortScores);
        
        Map<String, Decimal> squadScores = getScoresBySquad( userAcc );
        
        scores.put('Squad', squadScores);
        
        return scores;
    }
    
    public static Map<String, Decimal> getScoresByTeam(){
        List<AggregateResult> teamScores = [SELECT SUM(Total_Answers__C) answers, SUM(Total_Correct__C) correct, AVG(Score__c) score,  Account__r.Team__r.Name teamName FROM Exam_Result__c WHERE Graded__c=true GROUP BY Account__r.Team__r.Name ORDER BY AVG(Score__c) DESC];
        
        Map<String, Decimal> scoresByTeam = new Map<String, Decimal>();
        
        for(AggregateResult score: teamScores){
            
            scoresByTeam.put((String)score.get('teamName'), ((Decimal)score.get('score')).setScale(0));
            
        }
        
        return scoresByTeam;
    }

    public static Map<String, Decimal> getScoresByCohort(Account userAcc){
        List<AggregateResult> cohortScores = [SELECT SUM(Total_Answers__C) answers, SUM(Total_Correct__C) correct, AVG(Score__c) score, Account__r.Team__R.Name teamName, Account__r.Cohort__c FROM Exam_Result__c WHERE Account__r.Cohort__c = :userAcc.Cohort__c AND Graded__c = true GROUP BY Account__r.Cohort__c, Account__r.Team__r.Name ORDER BY AVG(Score__c) DESC];
        
        Map<String, Decimal> scoresByCohort = new Map<String, Decimal>();
        
        for(AggregateResult score: cohortScores){
            
            Decimal correct = (Decimal)score.get('correct');
            Decimal answers = (Decimal)score.get('answers');
            
            scoresByCohort.put((String)score.get('teamName'), ((Decimal)score.get('score')).setScale(0));
            
        }
        
        return scoresByCohort;
    }
    

    public static Map<String, Decimal> getScoresBySquad( Account userAcc ){
        
        List<AggregateResult> squadScores = [SELECT SUM(Total_Answers__C) answers, SUM(Total_Correct__C) correct, AVG(Score__C) score, Account__r.Squad__r.Name squadName, Account__r.Team__c FROM Exam_Result__c WHERE Account__r.Team__c = :userAcc.Team__c AND Graded__c = true GROUP BY Account__r.Team__c, Account__r.Squad__r.Name ORDER BY AVG(Score__c) DESC LIMIT 4 ];
        
        system.debug('Squad Scores: ' + squadScores);
        
        Map<String, Decimal> scoresBySquad = new Map<String, Decimal>();
        
        for(AggregateResult score: squadScores){
            
            Decimal squadScore = ((Decimal)score.get('score')).setScale(0);
           	String name = (String)score.get('squadName');
            scoresBySquad.put(name, squadScore);
            
        }
        
        return scoresBySquad;
    }
}