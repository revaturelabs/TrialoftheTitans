//Mohammed Azad
//Fixes the user issue
trigger educationUserTrigger on Education__c (before insert) {
	Id userId = UserInfo.getUserId();
    for(Education__c person: Trigger.new) {
        person.User__c = userId;
    }
}