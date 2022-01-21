public with sharing class SquadLeaderBoardHandler {
	@AuraEnabled(Cacheable=true)
   public static List<Squad__c> getSquadScore(){
			 
			return [SELECT Name, Score__c FROM Squad__c ORDER BY Score__c DESC LIMIT 3];

		}
}
