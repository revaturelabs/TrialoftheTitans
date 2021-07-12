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
    public static String runScheduler(String username, String password, String cron, String jobName){
        
        //Checks for valid Trial of the Titan credentials before scheduling
        TitanCallouts tc = new TitanCallouts(username, password);
        String accessToken = tc.returnAccessToken(tc);
        if(accessToken == null){
            return 'Invalid user credentials';
        }
        
        try{
            CodeAssessmentScheduler s = new CodeAssessmentScheduler(username, password);
            ID jobid = system.schedule(jobName, cron, s);
            
        } catch (Exception e) {
            return e.getMessage();
        }
        
        return 'Job "' + jobName + '" has been scheduled' ;
    }
    
}