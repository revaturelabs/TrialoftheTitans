public with sharing class HeroHubController {
    
    @AuraEnabled
    public static UserContextInfo getUserInfo(){
        try {
            UserContextInfo user = new UserContextInfo(UserInfo.getUserId());
            return user; 
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
}
