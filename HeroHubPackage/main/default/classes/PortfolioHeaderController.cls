public with sharing class PortfolioHeaderController {
    public PortfolioHeaderController() {

    }

    @AuraEnabled
    public static String getUserName() {
        //Method for retrieving Current User information
        return userInfo.getName();
    }
}
