////////////////////////////////////////////////////
//
// Author: Connor Melton
// Created: 07-02-2021
// Description: Controller that handles requests
//              from Hero Login Controller.
//
////////////////////////////////////////////////////

public class HeroLoginApexController {
    
    @AuraEnabled
    public static String runScheduler(String username, String cron, String jobName){
 
        try{
            CodeAssessmentScheduler s = new CodeAssessmentScheduler(username);
            ID jobid = system.schedule(jobName, cron, s);
            
        } catch (Exception e) {
            return e.getMessage();
        }
        
        return 'Job "' + jobName + '" has been scheduled' ;
    }
    
}