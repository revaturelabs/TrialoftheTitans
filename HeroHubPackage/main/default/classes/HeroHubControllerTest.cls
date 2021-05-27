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
    
   	@isTest
    static void testContextInfoRightUser(){
    	HeroHubTestUtilities.fullSetup();
    
    	User testUser = [SELECT Id FROM USER WHERE alias = 'testUser' LIMIT 1];
    
        UserContextInfo info;
    
    	system.runAs(testUser){
        
            info = HeroHubController.getUserInfo();
            
    	}
        
        system.AssertEquals(HeroHubTestUtilities.testAccount, info.acc.Id);
        system.AssertEquals(HeroHubTestUtilities.testSquad, info.squad.Id);
        system.AssertEquals(HeroHubTestUtilities.testTeam, info.team.Id);
        Contact userContact = [SELECT Id FROM Contact Where AccountId = :info.acc.Id Limit 1];
        system.AssertEquals(HeroHubTestUtilities.testContact, userContact.Id);
        
        system.AssertEquals(3, info.userExams.size());
        system.AssertEquals(3, info.userExams.get('Apex').size());
        system.AssertEquals(1, info.userExams.get('Apex')[0].currentResults.size());
       	system.AssertEquals(true, info.userExams.get('Apex')[0].isPassed);
    	system.debug(info);
    }
    
}