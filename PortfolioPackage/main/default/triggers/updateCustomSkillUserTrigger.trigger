trigger updateCustomSkillUserTrigger on Custom_Skill__c (before insert) {
    Id uid = UserInfo.getUserId();
    for(Custom_Skill__c c: Trigger.new){
        c.User__c = uid;
    }
}