trigger updateUserTrigger on Award__c (before insert) {
    Id userID = UserInfo.getUserId();
    for(Award__c a: Trigger.new) {
        a.User__c=userID;
    }
}