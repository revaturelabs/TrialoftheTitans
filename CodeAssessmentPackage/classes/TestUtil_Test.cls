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