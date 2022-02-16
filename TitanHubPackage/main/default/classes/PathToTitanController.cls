public class PathToTitanController {
    
    static PermissionSet sysAdminProfile = [SELECT Profile.Id FROM PermissionSet WHERE Profile.Name='System Administrator' AND isCustom=false];  
      
    // Function to retrieve Contact from Current User
    public static Contact getContact() {
        User user = [SELECT ContactId, ProfileId FROM User WHERE Id=:UserInfo.getUserId()];
        
        Contact contact;
        // If running as System Admin, retrieve a debug Contact
        if (user.ContactId != null) {
            contact = [SELECT AccountId FROM Contact WHERE Id=:user.ContactId];
        } else if (user.ProfileId == sysAdminProfile.ProfileId) {
            contact = [SELECT AccountId FROM Contact LIMIT 1];
        }
        return contact;
    }    
    // Function to Pass along Account information based on Contact
    @AuraEnabled(cacheable=true)
    public static Account getAccount() {
        Contact contact = getContact();
        Account account = [SELECT Name, Squad__c, Team__c, Cohort__c FROM Account WHERE Id=:contact.AccountId];
        return account;
    }
    // Function to Pass along Squad information based on Account
    @AuraEnabled(cacheable=true)
    public static Squad__c getSquad() {
        Account account = getAccount();
        return [SELECT Name From Squad__C WHERE Id=:account.Squad__c];
    }

    // Function to Retrieve Exams and their results Connected to Titan and Account Id parameter
    // @wire adapterConfig object MUST match with the apex parameters
    @AuraEnabled(cacheable=true)
    public static List<Exam_Result__c> getExamAndResultsList(Id titanId, Id accountId) {
        return [SELECT Exam__c, Exam__r.Name, Status__c FROM Exam_Result__c WHERE Exam__r.Titan__c=:titanId AND Account__c =:accountId ORDER BY Status__c ];
        
    }
}
