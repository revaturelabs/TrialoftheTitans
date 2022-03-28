///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Author: Gabriel Anton                                                                                     //
// Date: 3/22/22                                                                                             //
// Description: Apex controller that pulls categories and their associated skills from DB                    //
//                                                                                                           //
// Uses Category__c and Custom_Skill__c custom objects, which are related through a master-detail            //
// relationship                                                                                              //
//                                                                                                           //
// setProgress sets the progress for each corresponding skill, Id'd by the autonumber field Skill_Number__c  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

public with sharing class TestDataClass {

    @AuraEnabled
    public static void setProgress(String autoNumber, Integer progress) {
        List<Custom_Skill__c> csList = [SELECT Skill_Number__c 
                                        FROM Custom_Skill__c
                                       WHERE Skill_Number__c =:autoNumber LIMIT 1];
        
        Custom_Skill__c cs = csList[0];
        System.debug(cs);
        
        cs.Progress__c = progress;
        update cs;
        
    }

    @AuraEnabled(cacheable=true)
    public static List<Category__c> retrieveCategories() {
        Id uid = UserInfo.getUserId();
        return 
        [SELECT Name, 
        (SELECT Name, Skill_Number__c, Progress__c FROM Custom_Skills__r) 
        FROM Category__c
        WHERE User__c =: uid];

    }

    
}
