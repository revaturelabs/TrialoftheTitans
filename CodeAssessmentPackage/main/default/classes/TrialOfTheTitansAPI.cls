////////////////////////////////////////////////////
// Author: Connor Melton
// Created: 07-02-2021
// Description: REST api for creating code assessemnts and Hero Apex Test Results.
////////////////////////////////////////////////////

@RestResource(urlMapping='/code-assessment/results')
global class TrialOfTheTitansAPI {
    
    global class TestResult{
        global String outcome;
        global String methodName;
    }
    
    global class TestResultsJSON{
        global List<TestResult> resultList;
        
        global TestResultsJSON(){
            resultList = new List<TestResult>();
        }
    }
    
    @HttpPut
    global static String sendResults(List<TestResult> resultList){
        
        Coding_Assessment__c newAssessment = new Coding_Assessment__c();
        
        try{
            insert newAssessment;
        } catch (Exception e) {
            system.debug(e.getMessage());
        }
        
        List<Hero_Apex_Test_Result__c> newResults = new List<Hero_Apex_Test_Result__c>();
        
        for(TestResult tr : resultList){
            Hero_Apex_Test_Result__c t = new Hero_Apex_Test_Result__c();
            t.Coding_Assessment__c = newAssessment.id;
            t.Method_Name__c = tr.methodName;
            t.Passed__c = tr.outcome.equals('Pass');
            newResults.add(t);
        }
               
        try{
            insert newResults;
        }
        catch (Exception e){
            system.debug(e.getMessage());
        }
        
        return 'Success';
    }
}