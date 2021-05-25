public with sharing class HeroHubController {
    
    @AuraEnabled
    public static UserContextInfo getUserInfo(){
        try {
            UserContextInfo user = new UserContextInfo(UserInfo.getUserId());
            system.debug(user);
            return user; 
        } catch (Exception e) {
            system.debug(e);
            throw new AuraHandledException(e.getMessage());
        }
    }
    
}