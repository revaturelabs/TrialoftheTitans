public with sharing class HeroHubController {
    
    @AuraEnabled
    public static UserContextInfo getUserInfo(){
        try {
            
            //user will become userContextInfo in js Controller; 
            //UserContextInfo class builds the javascript object necessary for parsing
            UserContextInfo user = new UserContextInfo(UserInfo.getUserId());
            
            return user; 

        } catch ( Exception e ) {

            system.debug(e);
            throw new AuraHandledException(e.getMessage());
        
        }
    }
    
}