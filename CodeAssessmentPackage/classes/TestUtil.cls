////////////////////////////////////////////////////
// Author: Connor Melton
// Created: 07-02-2021 
// Description: Enqueues all local tests and returns a job id
////////////////////////////////////////////////////

public class TestUtil {
    
    // Enqueue all classes ending in "Test". 
    public static ID enqueueTests() {
        ApexClass[] testClasses = 
            [SELECT Id FROM ApexClass 
             WHERE Name LIKE '%Test'];
        if (testClasses.size() > 0) {
            ApexTestQueueItem[] queueItems = new List<ApexTestQueueItem>();
            for (ApexClass cls : testClasses) {
                queueItems.add(new ApexTestQueueItem(ApexClassId=cls.Id));
            }
            
            if(!test.isRunningTest()){
                insert queueItems;
                
                ApexTestQueueItem item = 
                    [SELECT ParentJobId FROM ApexTestQueueItem 
                     WHERE Id=:queueItems[0].Id LIMIT 1];
                return item.parentjobid;
            }
            
            // Get the job ID of the first queue item returne
        }
        return null;
    }
    
    // Get the result for each test method that was executed.
    public static ApexTestResult[] checkMethodStatus(ID jobId) {
        ApexTestResult[] results = 
            [SELECT Outcome, MethodName, Message
             FROM ApexTestResult 
             WHERE AsyncApexJobId=:jobId];
        for (ApexTestResult atr : results) {
            //System.debug(atr.ApexClass.Name + '.' + atr.MethodName + ': ' + atr.Outcome);
            if (atr.message != null) {
                System.debug(atr.Message + '\n at ' + atr.StackTrace);
            }
        }
        
        return results;
    }
}