trigger ExperienceTrigger on Experience__c (before insert) {
    if(Trigger.isInsert){
        ExperienceTriggerHandler.checkUser(Trigger.new);
    }
}