public with sharing class HeroHubController {
    
    @AuraEnabled
    public static methodName(){
        try {
            userAccount = HeroHubUtilities.getUserAccount();
            userExams = getUserExams(user);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
}
