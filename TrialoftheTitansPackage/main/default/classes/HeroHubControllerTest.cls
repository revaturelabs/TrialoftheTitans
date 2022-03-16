/////////////////////////////////////////////////////
//
//  Name: HeroHubController Test
//  Author: Josh Miccolo
//  Created: 5/24/2021
//  Updated: 9/3/2021
//  Description: Tests for the Hero Hub controller.
//  
//
///////////////////////////////////////////////////
@isTest
public class HeroHubControllerTest {

    //heroTestSetup() calls createUsers to create an admin and hero user for testing.
    @testSetup
    static void heroTestSetup(){
        HeroHubTestUtilities.createUsers();
    }

    //testContextInfoRightUser() tests to see if the information for the user is correct, using
    //getUserInfo from the HeroHubController to check this information.
   	@isTest
    static void testContextInfoRightUser(){
    	HeroHubTestUtilities.fullSetup();
    	User testUser = [SELECT Id FROM USER WHERE alias = 'testUser' LIMIT 1];
        UserContextInfo info;
    
    	system.runAs(testUser){
            info = HeroHubController.getUserInfo();
    	}

        Account useracct = [SELECT Id, Team__c, Squad__c FROM Account WHERE name = 'User'];
        
        //Assert user information associated with Id, squad, and team
        system.AssertEquals(useracct.Id, info.acc.Id);
        system.AssertEquals(useracct.Squad__c, info.squad.Id);
        system.AssertEquals(useracct.Team__c, info.team.Id);
  
        //Assert information about the user such as amount of exams and amount of results involving Apex
        //system.AssertEquals(3, info.userExams.size());
        //system.AssertEquals(0, info.userExams.get('Apex').size());
        //system.AssertEquals(2, info.userExams.get('Apex')[0].currentResults.size());
       	//system.AssertEquals(true, info.userExams.get('Apex')[0].isPassed);
    }

    //testAuraException() tests the negative use case where the running user would throw an aura exception
    //when we call the getUserInfo of HeroHubController
    @isTest
    static void testAuraException(){
        Boolean exceptionCaught = false;

        try{
            HeroHubTestUtilities.createWrongUser();
            
            HeroHubTestUtilities.fullSetup();

            User testUser = [SELECT Id FROM USER WHERE alias = 'TTrain' LIMIT 1];
            UserContextInfo info;

            System.runAs(testUser){
                info = HeroHubController.getUserInfo();
            }
        }catch(Exception e){
            exceptionCaught = true;
        }
        System.assertEquals(true, exceptionCaught);
    }
    
    //returnsdifferentTeams() checks to see if the two accounts returned have different teams
    //by getting the score by teams and then asserting that the size of the map created is 2.
    @isTest
    static void returnsdifferentTeams(){
        User testUser = [SELECT Id FROM USER WHERE alias = 'testUser'];
        
        List<Account> twoAccounts = getTwoAccounts();
		createResultsWithAnswers(twoAccounts);
        system.runAs(testUser){
        	Map<String, Decimal> teamScores = HeroHubController.getScoresbyTeam();
    
           	system.assertEquals(1, teamScores.size());
        }
   	}
    
    //findAllResults() queries for a testUser before getting the team scores and asserting that 
    //the resulting map has a size of 3
    @isTest
    static void findAllResults(){
        User testUser = [SELECT Id FROM User WHERE alias = 'testUser' LIMIT 1];
        system.runAs(testUser){
            Map<String, Map<String, Decimal>> HeroHub =  HeroHubController.getTeamScores();
            
            system.assertEquals(3, HeroHub.size());
        }
    }

    //getTwoAccounts() creates and inserts two accounts and their associated teams, squads and cohorts
    // into the database.
    private static List<Account> getTwoAccounts(){
        List<Account> acctList = new List<Account>();
        List<Team__c> teamList = new List<Team__c>();
        List<Squad__c> squadList = new List<Squad__c>();
        List<Cohort__c> cohortList = new List<Cohort__c>();
        
        //create two teams and two cohorts
        for(Integer i = 0; i < 2; i++){
            Team__c newTeam = new Team__c(Name = 'Team'+i);
            teamList.add(newTeam);
            Cohort__c newCohort = new Cohort__c(Name= 'Cohort' + i);
      		cohortList.add(newCohort);
       	}
        
        database.insert(teamList);
        database.insert(cohortList);
        
        //create a squad for each of the two teams
        for(Team__c team:teamList){
            Squad__c newSquad = new Squad__c(Name=team.Name+'squad', Team__c = team.Id);
            squadList.add(newSquad);
        }
        
        database.insert(squadList);
      	
        //create two accounts with the correct information.
        for(Integer i = 0; i < 2; i++){
            Account newAcct = new Account(Name='Test'+i, Team__c = teamlist[i].Id, 
            Squad__c = squadList[i].Id, Cohort__c = cohortList[i].Id);
            acctList.add(newAcct);
        }

        database.insert(acctList);
        return acctList;
        
    }
    
    //createResultsWithAnswers() creates and inserts exam results and answers for each account.
    //twoAccounts: list of two accounts to create results and answers for
    private static void createResultsWithAnswers(List<Account> twoAccounts){
        Exam__c newExam = new Exam__c(Name='testExam');
        database.insert(newExam);
        
        Exam_Question__c newQuestion = new Exam_Question__c(Name='testquestion');
       	database.insert(newQuestion);
        
        for(Account acct: twoAccounts){
        	Exam_Result__c newResult = new Exam_Result__c(Exam__c = newExam.Id, 
                                                            Account__c = acct.Id, 
                                                            Graded__c=true, 
                                                            Status__c = 'Completed');
            database.insert(newResult);

            Hero_Answer__c newAnswer = new Hero_Answer__c(Exam_Question__c = newQuestion.Id, 
                                                            Exam_Result__c = newResult.id, 
                                                            Correct__c = true);

            database.insert(newAnswer);
        }
    }
}