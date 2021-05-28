public without sharing class TitanPageApexController {
    public TitanPageApexController() {
    }

    @AuraEnabled
    public static User fetchUser() {
        //Method for retrieving Current User information
        User oUser = [SELECT id,FirstName,LastName FROM User WHERE id =:UserInfo.getUserId()];
        return oUser; 
    }

    @AuraEnabled
    public static List<Titan__c> getTitans() {
        //Method for retrieving list of titans
        List<Titan__c> titanList = [SELECT Name, Id FROM Titan__c];
        return titanList;
    }

		//Id titanId = 'a041100000HhiF6AAJ';
    
    @AuraEnabled
    public static List<Exam__c> getExams(Id titanId) {
        //Method for retrieving list of associated exams
 
        List<Exam__c> examsList = [SELECT Name, Default_Passing_Grade__c, Titan__c FROM Exam__c WHERE Titan__r.Id = :titanId];
        return examsList; 
    }
    
    
    @AuraEnabled
    public static List<Skill__c> getSkills(Id titanId) {
        //Method for retrieving list of associated skills
        List<Skill__c> skillsList = [SELECT Name, Skill_Breakdown__c, Titan__c FROM Skill__c WHERE Titan__r.Id = :titanId];
        return skillsList; 
    }

    
}