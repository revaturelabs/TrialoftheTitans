////////////////////////////////////////////////////
// Author: Connor Melton
// Created: 07-02-2021 
// Description: Tests Test Util class. 
// *NOTE: Method testCheckMethodStatus needs to be changed such that it
//  uses the id of a valid apex test result parent job id. 
////////////////////////////////////////////////////
@isTest
public class TestUtil_Test {
    
    @isTest
    static void testEnqueueTests(){
        
        Test.startTest();
        ApexClass testClasses = 
            [SELECT Id FROM ApexClass 
             WHERE Name LIKE '%Test' LIMIT 1];
        ApexTestQueueItem item = new ApexTestQueueItem(ApexClassId=testClasses.Id);
        
        System.assertEquals(TestUtil.enqueueTests(), item.ParentJobId);
        Test.stopTest();
        
    }
    
    @isTest
    static void testCheckMethodStatus(){
        
        Id jobId = '7075e00000UTXeDAAX';
        ApexTestResult[] results = 
            [SELECT Outcome, MethodName, Message
             FROM ApexTestResult 
             WHERE AsyncApexJobId=:jobId];
        ApexTestResult[] atr = TestUtil.checkMethodStatus('7075e00000UTXeDAAX');
        System.assertEquals(atr.size(), results.size());
        
        
        for(Integer i = 0; i < atr.size(); i++) {
            System.assertEquals(results[i].Message, atr[i].Message);
            i++;
        }
        
    }

}