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
    
}