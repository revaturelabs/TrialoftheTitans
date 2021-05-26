@isTest
public class UserContextInfoTest {
	
    @isTest
    static void userContextInfoReturnsAccount(){
        HeroHubTestUtilities.createRightUser();
        
        User rightUser = [SELECT Id FROM USER WHERE alias = 'testUser' Limit 1];
        Account rightAccount = [SELECT Id FROM Account Where name = 'User' Limit 1];
		
        UserContextInfo userInfo = new UserContextInfo(rightUser.Id);
            
        system.assertEquals(rightAccount.Id, userInfo.acc.Id);
            
    }
    
    @isTest
    static void userContextInfoReturnsTeam(){
        HeroHubTestUtilities.createRightUser();
        User rightUser = [SELECT Id FROM USER WHERE alias = 'testUser' Limit 1];
        Team__C rightTeam = [SELECT Id FROM Team__c WHERE Name = 'Amplifire'];
        
  		UserContextInfo userInfo = new UserContextInfo(rightUser.Id);
        
        system.assertEquals(rightTeam.Id, userInfo.team.Id);
    }
    
    @isTest
    static void userContextInfoReturnsSquad(){
        HeroHubTestUtilities.createRightUser();
        User rightUser = [SELECT Id FROM USER WHERE alias = 'testUser' Limit 1];
       	Squad__C rightSquad = [SELECT Id FROM Squad__c WHERE Name = 'This is Fire'];
        
  		UserContextInfo userInfo = new UserContextInfo(rightUser.Id);
        
        system.assertEquals(rightSquad.Id, userInfo.squad.Id);
    }
    
    @isTest
    static void userContextInfoReturnsAllTitans(){
        HeroHubTestUtilities.createRightUser();
        HeroHubTestUtilities.createTitans();
        
        User rightUser = [SELECT Id FROM USER WHERE alias = 'testUser' Limit 1];
        List<Titan__c> allTitans = [SELECT Id, Name FROM Titan__c];
        
        UserContextInfo userInfo = new UserContextInfo(rightUser.Id);
        
        for(Titan__c titan: allTitans){
            
            system.assert(userInfo.getAllTitans().contains(titan));
        
        }
        
    }
    
    @isTest
    static void userContextInfogetExams(){
        HeroHubTestUtilities.fullSetup();
        User rightUser = [SELECT Id FROM USER WHERE alias = 'testUser' Limit 1];
        
        UserContextInfo userInfo = new UserContextInfo(rightUser.Id);
        
        system.debug(userInfo);
        
        
    }
    
    @isTest
    static void userContextInfoThrowsWrongUser(){
        HeroHubTestUtilities.createRightUser();
        User wrongUser = [SELECT Id FROM USER WHERE alias = 'testTrainer' Limit 1];
        
        try{
            UserContextInfo userInfo = new UserContextInfo(wrongUser.Id);
            system.assert(false);
        }
        catch(Exception e){
            system.debug(e.getMessage());
            system.assert(true);
        }
    }
    
}