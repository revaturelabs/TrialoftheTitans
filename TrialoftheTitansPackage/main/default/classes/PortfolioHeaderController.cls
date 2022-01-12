public with sharing class PortfolioHeaderController {

    public static String jobname;
    
    @AuraEnabled(cacheable=true)
    public static String getUserName() {
        //Method for retrieving Current User information
        return userInfo.getName();
    }

    @AuraEnabled
    public static string getJob() {
        id UserId = UserInfo.getUserId();
        List<Job__c> job = [SELECT Name FROM Job__c WHERE User__c =:UserId Limit 1];
        if(job.isEmpty()) {
           return null;
        } else {
            return job[0].Name;
        }
    }

    @AuraEnabled
    public static void setJob(String job) {
        id UserId = UserInfo.getUserId();
        List<Job__c> jobs = [Select Name FROM Job__c WHERE User__c =:UserId Limit 1];
        if(jobs.isEmpty()) {
           Job__c setjob = new Job__c(Name=job, User__c = UserId);
           insert setjob;
         } else {
             jobs[0].Name = job;
             update jobs;
         }
    }
}