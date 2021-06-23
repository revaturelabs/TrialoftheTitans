/////////////////////////////////////////////////////
//
//  Name: AssessmentSetup
//  Author: Kameron Fincher
//  Description: Utility class to create new data for 
//	the Cohort Page and Trainer Hub. It is ideal to 
//	run UserAccountSetup.UserSetup prior to this.
//	
///////////////////////////////////////////////////
public class AssessmentSetup {
    // Creates assement and hero assessment objects, associating them with existing heroes (accounts)
    public static void Setup(){
        List<Assessment__c> assessmentList = new List<Assessment__c>();
        
        assessmentList.add(new Assessment__c(Name = 'One on One', Type__c='1-on-1', Description__c='A check-in and mock interview with Heroes'));
        assessmentList.add(new Assessment__c(Name = 'Project 0', Type__c='Project', Description__c='Heroes will model a business of their choosing with a Lightning app'));
        assessmentList.add(new Assessment__c(Name = 'Project 1', Type__c='Project', Description__c='Heroes will create an experience cloud site using Visualforce Pages'));
        assessmentList.add(new Assessment__c(Name = 'Project 2', Type__c='Project', Description__c='Heroes will create an experience cloud site using Aura Components, while implementing Sales Cloud and Service Cloud solutions'));
        assessmentList.add(new Assessment__c(Name = 'Coding Challenge', Type__c='Misc', Description__c='A general coding challenge to see where Heroes are programming-wise'));
        
        insert assessmentList;
        
        List<Account> userAccount = [SELECT Name, Team__c from Account]; 
        List<Hero_Assessment__c> heroAssessmentList = new List<Hero_Assessment__c>();
        
        for(Assessment__c a : assessmentList){
            for(Account acc : userAccount){
                if(acc.Team__c!=null){
                    Hero_Assessment__c tempHeroAssessment = new Hero_Assessment__c(Hero__c=acc.id,Assessment__c=a.id);
                    tempHeroAssessment.Overall_Score__c = (Math.random()*50)+50;
                    heroAssessmentList.add(tempHeroAssessment);
                }
            }
        }
        
       insert heroAssessmentList;
        
    }
}