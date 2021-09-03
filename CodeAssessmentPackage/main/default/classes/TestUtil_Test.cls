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
        
        test.startTest();
        TestUtil.enqueueTests();
        test.stopTest();
    }
    
    @isTest
    static void testCheckMethodStatus(){
        
        test.startTest();
        testUtil.checkMethodStatus('7075e00000UTXeDAAX');
        test.stopTest();
    }

}