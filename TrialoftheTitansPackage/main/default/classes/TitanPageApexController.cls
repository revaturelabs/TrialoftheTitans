public without sharing class TitanPageApexController {

    
    @AuraEnabled(cacheable=true)
    public static String fetchUser() {
        //Method for retrieving Current User information
        return userInfo.getName();
    }
    
    // Method added by 8/16 cohort.
    // Return a list of Titan__c object that are in the Curriculum that is attached to the current user.
    // THe current user is a hero(Account object).
    @AuraEnabled(cacheable=true)
    public static List<Titan__c> getTitansList() {
        // Get the name of the curriculum attached to the current user.
        // SELECT Curriculum__r.Name, Id FROM Account WHERE OwnerId = '0051700000Aq9LdAAJ'
        Account acc = [SELECT Curriculum__r.Name, Id FROM Account WHERE OwnerId = :UserInfo.getUserId() LIMIT 1];
        String nameOfCurriculum = acc.Curriculum__r.Name;

        // Use the name of the curriculum to query the Titans.
        // SELECT Name, Id, Technology__c, OwnerId FROM Titan__c WHERE Curriculum__r.Name = 'C1'
        List<Titan__c> titanList = [SELECT Name, Id, Technology__c, OwnerId FROM Titan__c WHERE Curriculum__r.Name = :nameOfCurriculum];
        return titanList;
    }
    

    @AuraEnabled(cacheable=true)
    public static List<Titan__c> getTitans() {
        //Method for retrieving list of titans
      
        
     	Account acc = [SELECT Curriculum__c FROM Account WHERE Name = :userInfo.getName()];
		List<Titan__c> titanList = [SELECT Name FROM Titan__c WHERE Curriculum__c = :acc.Curriculum__c];

        return titanList;
    }
    
    //Id titanId = 'a041100000HhiF6AAJ';
    
    @AuraEnabled(cacheable=true)
    public static List<Exam__c> getExams(Id titanId) {
        //Method for retrieving list of associated exams
        
        List<Exam__c> examsList = [SELECT Name, Default_Passing_Grade__c, Titan__c, (SELECT Total_Answers__c, Total_Correct__c FROM Exam_Results__r) FROM Exam__c WHERE Titan__r.Id = :titanId];
        return examsList; 
    }
    
   
    @AuraEnabled(cacheable=true)
    public static List<Skill__c> getSkills(Id titanId) {
        //Method for retrieving list of associated skills
        List<Skill__c> skillsList = [SELECT Name, Skill_Breakdown__c, Titan__c FROM Skill__c WHERE Titan__r.Id = :titanId];
        return skillsList; 
    }
    
     
}




//public static Account getAccountId(Id UserId) {
    //Account userAccount = [SELECT Id, Name, Curriculum__c, Squad__c FROM Account WHERE contactId=:UserInfo.getUserId];
    //return userAccount;
    //0035400000hgNoIAAU
    //return userAccount;
    //SELECT name, Id, Contact.Account.Name FROM Contact WHERE Id ='0035400000hgNoIAAU'
    
    //}



//        return titanList;
//	    List<user> userIdList = [SELECT Name FROM User WHERE Id =:UserInfo.getUserId() LIMIT 1];
//      String userName = userIdList[0].Name;
	    //List<Curriculum__c> list1 = [SELECT Id,(SELECT Id FROM Accounts__r), (SELECT Name FROM Titans__r) FROM Curriculum__c];
//        List<Curriculum__c> titanList = [SELECT Id,(SELECT Name FROM Accounts__r WHERE Name = :userName), (SELECT Name FROM Titans__r) 
//                                    FROM Curriculum__c];
        //WHERE Accounts__r.Id =:UserInfo.getUserId()