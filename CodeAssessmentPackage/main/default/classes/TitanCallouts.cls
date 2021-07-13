////////////////////////////////////////////////////
//
// Author: Connor Melton
// Created: 07-02-2021
// Description: Makes callouts to Trial of the Titan's api.
//
////////////////////////////////////////////////////

public class TitanCallouts{
    
    private String clientId;
    private String secret;
    private String username;
    private String password;
    
    TitanCallouts(){
        username = '';
        password = '';
    }
    
    public TitanCallouts(String username, String password){
        this.username = username;
        this.password = EncodingUtil.urlEncode(password, 'UTF-8');
        clientId = '3MVG9AzPSkglhtpuSHJeJCXUd71nfibk6C45bKJtcioj4piwxn1r242EXUQzHHWhVTJXMa923pbaAPq.uVqac';
        secret = 'C9D693050E9BAB88FD7F92AA797E14E23B696AD7F8CA0060E9B064A6035DA5BB';
    }
    
    public class deserializeResponse {
        public String id;
        public String access_token;
    }
    
    public String ReturnAccessToken(TitanCallouts acount){
        String reqbody = 'grant_type=password&client_id='+clientId+'&client_secret='+secret+'&username='+username+'&password='+password;
        system.debug('reqbody : ' + reqbody);
        
        Http h = new Http();
        HttpRequest req = new HttpRequest();
        req.setBody(reqBody);
        req.setMethod('POST');
        req.setEndpoint('https://customization-efficienc284-dev-ed.cs96.my.salesforce.com/services/oauth2/token');
        HttpResponse res = h.send(req);
        System.debug(res.getBody());
        deserializeResponse resp1 = (deserializeResponse)JSON.deserialize(res.getBody(), deserializeResponse.class);
        return resp1.access_token;
    }
    
    @Future(callout=true)
    public static void sendResults(ID jobid, String username, String password){
        TitanCallouts a1 = new TitanCallouts(username, password);
        String accessToken = a1.returnAccessToken(a1);
        
        if(accessToken != null){
            String endPoint = 'https://customization-efficienc284-dev-ed.cs96.my.salesforce.com/services/apexrest/code-assessment/results';
            
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
            //responsebody = res.getBody();
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