//created by Tyler Fé 10/18/2021
//discord: always_asking#2363
//email: tyler.fe@revature.net

public with sharing class HeroHubDataFactory {
    public static void dataFactory() {
        integer n = 0;
        List <Job__c> job = new List <Job__c>();
        List <Certification__c> cert = new List <Certification__c>();
        List <Education__c> edu = new List <Education__c>();
        List <Experience__c> exp = new List <Experience__c>();
        while (n<=100){
            n+=1;
           job.add(new Job__c(
                Name = 'Test Job ' + n,
                user__c = 'Test User ' + n
            ));
            // cert.add(new Certification__c(
            //     Name = 'Test Cert ' + n
            // ));
            edu.add(new Education__c(
                Name = 'Test Education ' + n
            ));
            exp.add(new Experience__c(
                Name = 'Test Experience ' + n,
                Company__c = 'Test Company ' + n,
                End_Date__c = system.today() + 7,
                Position__c = 'Test Position ' + n,
                Start_Date__c = system.today()
            ));
        }
        insert job;
        insert cert;
        insert edu;
        insert exp;
    }
    
}
