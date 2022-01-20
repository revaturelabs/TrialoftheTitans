public with sharing class teamLeaderBoardHandler {
    @AuraEnabled(Cacheable=true)
		public static List<Team__c>getSquadSum(){

			return [SELECT Id, Name,Squad_Sum__c FROM Team__c ORDER BY Squad_Sum__c DESC LIMIT 3];
			
		}
}
