/*
    Author: Drew Williams
    Description: Card container for Honors & Awards section in Portfolio
    Created Date: 3/24/22
*/

// Trigger to insert the user ID when a new record is created on the Award object
trigger updateUserTrigger on Award__c (before insert) {
    Id userID = UserInfo.getUserId();
    for(Award__c a: Trigger.new) {
        a.User__c=userID;
    }
}