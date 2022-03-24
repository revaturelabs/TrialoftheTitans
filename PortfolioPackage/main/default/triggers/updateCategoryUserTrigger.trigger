trigger updateCategoryUserTrigger on Category__c (before insert) {
    Id uid = UserInfo.getUserId();
    for(Category__c c: Trigger.new){
        c.User__c = uid;
    }
}