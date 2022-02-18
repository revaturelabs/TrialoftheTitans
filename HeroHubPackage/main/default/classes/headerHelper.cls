
/*
Created by: Andrew Emond
Description: Apex class for Header LWC
Date Created: 1/21/2022
*/

public with sharing class headerHelper {
    @AuraEnabled(cacheable=true)
    public static list<Team__c> getTeamInfo(){                         //Used for pulling what team is in the lead to LWC Header. Based on which team has the In Lead Field Checked.
        return [SELECT Name,In_Lead__c,Primary_Color__c,Secondary_Color__c,Slogan__c FROM Team__c WHERE In_Lead__c=: true];
    }
    @AuraEnabled(cacheable=true)
    public static Curriculum__c getTechInfo(){                       //Used for pulling the current users tech to LWC. I had to jump through a lot of hoops to get to this point,
        id userId = UserInfo.getUserId();                            //hopefully a future iteration can refine the data model and make better relationships.
        User conObj = [SELECT name,ContactId,Id FROM User WHERE Id=: userId LIMIT 1];
        id conId = conObj.ContactId;
        Contact accObj = [SELECT name,AccountId,Id FROM Contact WHERE Id=: conId LIMIT 1];
        id accId = accObj.AccountId;
        Account curObj = [SELECT name,Curriculum__c,Id FROM Account WHERE Id=: accId LIMIT 1];
        id curId = curObj.Curriculum__c;
        return [ SELECT name,Technology__c,Id FROM Curriculum__c WHERE Id=: curId LIMIT 1];
    }
}
