public class PathToTitanController {
    public static Integer index;    
    public PathToTitanController() {
        index = 0;
    }
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

    // Function to Retrieve Exams Connected to Titan parameter
    public static List<Exam__c> getExamList(Id titanId) {
        List<Exam__c> retrieveList = [SELECT Id, Name FROM Exam__c WHERE Titan__c =: titanId];
        List<wrapExam> wrappedList = new List<wrapExam>();
        for (Exam__c e : retrieveList) {
            wrappedList.add(e);
        }
        return wrappedList;
    }
    // Wrapper Class to Hold Exam with Iterated Priority Tag
    public class wrapExam {
        public Exam__c exam {get;set;}
        public Integer priorityTag {get;set;}

        public wrapExam(Exam__c e) {
            this.exam = e;
            index++;
            this.priorityTag = index;
        }
    }
}
