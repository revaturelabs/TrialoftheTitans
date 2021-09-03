////////////////////////////////////////////////////
// Author: Connor Melton
// Created: 07-02-2021 
////////////////////////////////////////////////////

@isTest
private class TitanCallouts_Tests {
    
    @isTest
    static void testTitanCalloutReturnAccessToken(){
        HTTPMockFactory mock = new HTTPMockFactory(200, 'OK', 'Access Token', new Map<String, String>());
        Test.setMock(HttpCalloutMock.class, mock);
        String result;
        Test.startTest();
        TitanCallouts t = new TitanCallouts();
        result = t.ReturnAccessToken('Testing');
        Test.stopTest();
        system.assertEquals('Test Token Will Not Be Used!!', result);
    }
    
    @isTest
    static void testSendResults(){
        HTTPMockFactory mock = new HTTPMockFactory(200, 'OK', '', new Map<String, String>());
        Test.setMock(HttpCalloutMock.class, mock);
        String result;
        Test.startTest();
        TitanCallouts.sendResults('7075e00000UTXeDAAX', 'Testing');
        Test.stopTest();
        system.assertEquals(null , result);
    }
}