////////////////////////////////////////////////////
//
// Author: Connor Melton
// Created: 07-02-2021
// Description: Makes callouts to Trial of the Titan's api.
//
////////////////////////////////////////////////////

public class TitanCallouts{
    
    private final String clientId = '3MVG98RqVesxRgQ4xmwdKHqEpPwavMpbMNBmDTS5Lqxgw44NbKyL1H3cGPhvJkPk2ki4Bb1Tqsb1mHPgTed0J';
    private final String url = 'https://sandbox-ability-agility-36642-dev-ed-17a635bfc7f.cs18.force.com';
    private String username;
    
    public TitanCallouts(){
        
    }
    
    public TitanCallouts(String username){
        this.username = username;
    }
    
    //Reference link below for Oauth JWT bearer token flow
    //https://developer.salesforce.com/docs/atlas.en-us.apexref.meta/apexref/apex_class_Auth_JWTBearerTokenExchange.htm
    public String ReturnAccesstoken(String username){
        Auth.JWT jwt = new Auth.JWT();
        jwt.setSub(username);
        jwt.setAud(url);
        jwt.setIss(clientId);
        
        Auth.JWS jws = new Auth.JWS(jwt, 'tottcert');
        String tokenEndpoint = url + '/services/oauth2/token';
        String token = 'Test Token Will Not Be Used!!';
        
        //Work around for testing Auth JWT token exchange
        if(!Test.isRunningTest()){
            Auth.JWTBearerTokenExchange bearer = new Auth.JWTBearerTokenExchange(tokenEndpoint, jws);
            token = bearer.getAccessToken();
        }
        
        return token;
    }
    
    @Future(callout=true)
    public static void sendResults(ID jobid, String username){
        TitanCallouts a1 = new TitanCallouts();
        String accessToken = a1.returnAccessToken(username);
        
        if(accessToken != null){
            String endPoint = 'https://ability-agility-36642-dev-ed.cs18.my.salesforce.com/services/apexrest/code-assessment/results';
            
            TestResultsJSON testResults = new TestResultsJSON();
            testResults.resultList = new List<TestResult>();
            for(ApexTestResult cls : TestUtil.checkMethodStatus(jobid)){
                TestResult tr = new TestResult();
                tr.outcome = cls.Outcome;
                tr.methodName = cls.methodName;
                testResults.resultList.add(tr);
            }
            string jStr = JSON.serialize(testResults);
            
            system.debug('jsonString : ' + jStr);
            
            Http h = new Http();
            HttpRequest req = new HttpRequest();
            req.setHeader('Authorization', 'Bearer ' + accessToken);
            req.setHeader('Content-Type', 'application/json');
            req.setHeader('accept', 'application/json');
            req.setBody(jStr);
            req.setMethod('PUT');
            req.setEndpoint(endPoint);
            
            HttpResponse res = h.send(req);
        }
    }
    
    public class TestResult{
        public String outcome;
        public String methodName;
    }
    
    public class TestResultsJSON{
        public List<TestResult> resultList;
    }
    
}