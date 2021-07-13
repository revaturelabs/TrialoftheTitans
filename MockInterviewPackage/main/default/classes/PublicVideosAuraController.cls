/////////////////////////////////////////////////////
//
//  Name: Public Videos Aura Controller
//  Author: Alyssa Reed
//  Description: This class uses SOQL queries to
//  	 retrieve all of the videos that are marked 
//  	 as public and return them according to 
//  	 the chosen filter. The associated aura 
//  	 component uses the getPublicVideos query 
//  	 below.
//
////////////////////////////////////////////////////

public with sharing class PublicVideosAuraController {
	
    @auraEnabled //database results arranged in order of what was created most recently.
    public static list<Mock_Interview_Self__c> getPublicVideos(){ 
    list<Mock_Interview_Self__c> publicVids = [SELECT Id, Cohort__c, AccountName__c, Name FROM Mock_Interview_Self__c WHERE Public__c = true ORDER BY CreatedDate DESC];
    system.debug(publicVids);
    return publicVids;
    
    }
    
    @auraEnabled
    public static list<Mock_Interview_Self__c> filterByHeroName(){
       list<Mock_Interview_Self__c> heroNames = [SELECT Id, Cohort__c, AccountName__c, Name FROM Mock_Interview_Self__c WHERE Public__c = true ORDER BY AccountName__c];
       //system.debug(heroNames);    
       return heroNames;
    }
    
    @auraEnabled
    public static list<Mock_Interview_Self__c> filterByCohort(){
       list<Mock_Interview_Self__c> cohortGroups = [SELECT Id, Cohort__c, AccountName__c, Name FROM Mock_Interview_Self__c WHERE Public__c = true ORDER BY Cohort__c];
        //system.debug(cohortGroups);    
       return cohortGroups;
    }
    
    @auraEnabled
    public static String userProfile(){
        List<Profile> PROFILE = [SELECT Id, Name FROM Profile WHERE Id=:userinfo.getProfileId() LIMIT 1];
		String MyProfileName = PROFILE[0].Name;
        system.debug(MyProfileName);
        return MyProfileName;
    }
}