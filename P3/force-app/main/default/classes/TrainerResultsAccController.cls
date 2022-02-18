/////////////////////////////////////////////////////
//
//  Name: TrainerResultsAccController
//  Author: Frank Berni
//  Description: AuraEnabled Methods for querying feedback and heros as well as aggregate averages for Hero and Cohort 
//  				
//
///////////////////////////////////////////////////

public class TrainerResultsAccController {
    
    
    //Relationships in Package (child to parent): Feedback > Mock Interview > Account > Cohort
    @AuraEnabled
    public static List<Feedback__c> grabFeedback(String name){
        List<Feedback__c> h = [SELECT Id, Name, Confidence__c, Body_Language__c, Eye_Contact__c, Fluency__c, Comments__c, Type__c, Mock_Interview_Self__r.Account__r.Name  FROM Feedback__c 
                               WHERE Mock_Interview_Self__r.Account__r.Name =:name];
        //system.debug(h);
        return h;
    }
    
    //Grabbing a list of Heroes
     @AuraEnabled
    public static List<Account> grabHeroes(){
        List<Account> h = [SELECT Id, Name, Cohort__r.Name FROM Account];
        //system.debug(h);
        return h;
    }
    
    //Grabbing a list of Cohorts
     @AuraEnabled
    public static List<Cohort__c> grabCohorts(){
        List<Cohort__c> c = [SELECT Id, Name FROM Cohort__c];
        return c;
    }
    
    //Enter name of a Hero as the parameter
    @AuraEnabled
    public static List<aggregateResult> grabAggHero(String name){
        //Pulling Average of all Feedback scores from a Hero
        List<aggregateResult> hero = [SELECT Mock_Interview_Self__r.Account__r.Name, 
                                      Avg(Body_Language__c), Avg(Confidence__c), Avg(Eye_Contact__c), Avg(Fluency__c)
                                     FROM Feedback__c 
                                     WHERE Mock_Interview_Self__r.Account__r.Name =:name 
                                     GROUP BY Mock_Interview_Self__r.Account__r.Name];
        
        return hero;
    }
    
    //Enter name of the Cohort as the parameter
    @AuraEnabled
    public static List<aggregateResult> grabAggCohort(String name){
        //Pulling Average of all scores from everyone in a cohort
        List<aggregateResult> cohTotal = [SELECT Mock_Interview_Self__r.Account__r.Cohort__r.Name, 
                                          Avg(Body_Language__c), Avg(Confidence__c), Avg(Eye_Contact__c), Avg(Fluency__c) 
                                         FROM Feedback__c 
                                         WHERE Mock_Interview_Self__r.Account__r.Cohort__r.Name =:name
                                         GROUP BY Mock_Interview_Self__r.Account__r.Cohort__r.Name];
        
        //system.debug(cohTotal);
        Return cohTotal;     
    }

}
