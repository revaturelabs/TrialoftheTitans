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
        
        system.debug(resultList);
        
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
        
        /*List<Test_Result__c> newResults = new List<Test_Result__c>();
        
        for(TestResult tr : resultList){
            Test_Result__c t = new Test_Result__c();
            t.Method__c = tr.methodName;
            t.Pass__c = tr.outcome;   
            newResults.add(t);
        }
        
        
        
        //Test_Result__c t = new Test_Result__c();
        //t.Method__c = 'testing...';
        ///*/
        system.debug(newResults);
        
        
        try{
            //insert t;
            insert newResults;
        }
        catch (Exception e){
            system.debug(e.getMessage());
        }
        
        return 'testing...';
    }
}