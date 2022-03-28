//Mohammed Azad
//Fixes the user issue relating to the experience object
trigger experienceUserTrigger on Experience__c (before insert) {
	Id userId = UserInfo.getUserId();
    for(Experience__c person : Trigger.new) 
    {
        person.User__c = userId;
    }
}