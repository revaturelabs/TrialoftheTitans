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
 
            insert queueItems;
 
            // Get the job ID of the first queue item returned.
            ApexTestQueueItem item = 
               [SELECT ParentJobId FROM ApexTestQueueItem 
                WHERE Id=:queueItems[0].Id LIMIT 1];
            return item.parentjobid;
        }
        return null;
    }
 
    // Get the status and pass rate for each class
    // whose tests were run by the job.
    // that correspond to the specified job ID.
    public static void checkClassStatus(ID jobId) {
        ApexTestQueueItem[] items = 
           [SELECT ApexClass.Name, Status, ExtendedStatus 
            FROM ApexTestQueueItem 
            WHERE ParentJobId=:jobId];
        for (ApexTestQueueItem item : items) {
            String extStatus = item.extendedstatus == null ? '' : item.extendedStatus;
            System.debug(item.ApexClass.Name + ': ' + item.Status + extStatus);
        }
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