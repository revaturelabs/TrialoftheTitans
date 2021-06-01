/////////////////////////////////////////////////////
//
//  Name: HeroHubController Test
//  Author: Josh Miccolo
//  Created: 5/24/2021
//  Updated: 5/25/2021
//  Description: Tests for the Hero Hub controller.
//  
//
///////////////////////////////////////////////////
@isTest
public class HeroHubControllerTest {
    @testSetup
    static void heroTestSetup(){
        HeroHubTestUtilities.createUsers();
    }
   	@isTest
    static void testContextInfoRightUser(){
    	HeroHubTestUtilities.fullSetup();
    
    	User testUser = [SELECT Id FROM USER WHERE alias = 'testUser' LIMIT 1];
    
        UserContextInfo info;
    
    	system.runAs(testUser){
        
            info = HeroHubController.getUserInfo();
            
    	}
        Account useracct = [SELECT Id, Team__c, Squad__c FROM Account WHERE name = 'User'];
        
        system.AssertEquals(useracct.Id, info.acc.Id);
        system.AssertEquals(useracct.Squad__c, info.squad.Id);
        system.AssertEquals(useracct.Team__c, info.team.Id);
  
        
        system.AssertEquals(3, info.userExams.size());
        system.AssertEquals(3, info.userExams.get('Apex').size());
        system.AssertEquals(2, info.userExams.get('Apex')[0].currentResults.size());
       	system.AssertEquals(true, info.userExams.get('Apex')[0].isPassed);
    	system.debug(info);
    }
    
    @isTest
    static void returnsdifferentTeams(){
        User testUser = [SELECT Id FROM USER WHERE alias = 'testUser'];
        List<Account> twoAccounts = getTwoAccounts();
		createResultsWithAnswers(twoAccounts);
        
        system.runAs(testUser){
            
        	Map<String, Decimal> teamScores = HeroHubController.getScoresbyTeam();
            
           	system.assertEquals(2, teamScores.size());
        
        }
   	}
    
    private static List<Account> getTwoAccounts(){
        List<Account> acctList = new List<Account>();
        List<Team__c> teamList = new List<Team__c>();
        List<Squad__c> squadList = new List<Squad__c>();
        List<Cohort__c> cohortList = new List<Cohort__c>();
        
        for(Integer i = 0; i < 2; i++){
            Team__c newTeam = new Team__c(Name = 'Team'+i);
            teamList.add(newTeam);
            Cohort__c newCohort = new Cohort__c(Name= 'Cohort' + i);
      		cohortList.add(newCohort);
       	}
        database.insert(teamList);
        database.insert(cohortList);
        
        for(Team__c team:teamList){
            Squad__c newSquad = new Squad__c(Name=team.Name+'squad', Team__c = team.Id);
            squadList.add(newSquad);
        }
        
        database.insert(squadList);
      	
        for(Integer i = 0; i < 2; i++){
            Account newAcct = new Account(Name='Test'+i, Team__c = teamlist[i].Id, Squad__c = squadList[i].Id, Cohort__c = cohortList[i].Id);
            acctList.add(newAcct);
        }
        database.insert(acctList);
        
        return acctList;
        
    }
    
    private static void createResultsWithAnswers(List<Account> twoAccounts){
        
        Exam__c newExam = new Exam__c(Name='testExam');
        database.insert(newExam);
        
        Exam_Question__c newQuestion = new Exam_Question__c(Name='testquestion');
       	database.insert(newQuestion);
        
        for(Account acct: twoAccounts){
        	    Exam_Result__c newResult = new Exam_Result__c(Exam__c = newExam.Id, Account__c = acct.Id, Graded__c=true, Status__c = 'Completed');
            	database.insert(newResult);
            	Hero_Answer__c newAnswer = new Hero_Answer__c(Exam_Question__c = newQuestion.Id, Exam_Result__c = newResult.id, Correct__c = true);
            	database.insert(newAnswer);
        }
    }
    
}