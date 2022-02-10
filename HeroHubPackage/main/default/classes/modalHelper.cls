public without sharing class modalHelper{		
    
    // getViewedWeekly retrieves the boolean value of the Weekly News checkbox for the specific current user.
    @AuraEnabled(cacheable=true)
    public static boolean getViewedWeekly(Id userID){
        List<User> users = [SELECT ContactId FROM User
        WHERE Id = :userID];
        
        List<Contact> values = [SELECT Weekly_News__c, Id FROM Contact
                               WHERE Id = :users[0].contactID];
		
        
        Boolean ret = boolean.valueOf((values[0].get(Contact.Weekly_News__c)));
        return ret;
    }
    
    // getViewedWeekly retrieves the boolean value of the Logged In checkbox for the specific current user.
    @AuraEnabled(cacheable=true)
    public static boolean getViewedWelcome(Id userID){
        List<User> users = [SELECT ContactId FROM User
        WHERE Id = :userID];
        
        List<Contact> values = [SELECT Logged_In__c, Id FROM Contact
                               WHERE Id = :users[0].contactID];
		
        
        Boolean ret = boolean.valueOf((values[0].get(Contact.Logged_In__c)));
        return ret	;
    }
    
    // closeWelcomeModal changes the boolean valaue of the Weekly News checkbox to true.
    @AuraEnabled(cacheable=false)
    public static void closeNewsModal(Id userID){
        User currentUser = [SELECT ContactId FROM User
        WHERE Id = :userID LIMIT 1];
        
        Contact userContact = [SELECT Weekly_News__c, Id FROM Contact
                               WHERE Id = :currentUser.contactID LIMIT 1];

        userContact.Weekly_News__c = true;
        update userContact;
    }
    
    // closeWelcomeModal changes the boolean valaue of the Logged In checkbox to true.
    @AuraEnabled(cacheable=false)
    public static void closeWelcomeModal(Id userID){
        User currentUser = [SELECT ContactId FROM User
        WHERE Id = :userID LIMIT 1];
        
        Contact userContact = [SELECT Logged_In__c, Id FROM Contact
                               WHERE Id = :currentUser.contactID LIMIT 1];
   
        userContact.Logged_In__c = true;
        update userContact;
    } 
}