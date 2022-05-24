public without sharing class AssignmentController {
    @AuraEnabled(cacheable=true)
    public static List<ExamtoSkill__c> getExams(String skill) {
        return [SELECT Name, Skill__r.Name, Exam__r.Name 
            FROM ExamtoSkill__c 
            WHERE Skill__r.Name =: skill];       
    }

    @AuraEnabled(cacheable=true)
    public static String getTitanName(String skill) {
        return [SELECT Titan__r.Name FROM Skill__c WHERE name =: skill][0].Titan__r.Name;
    }
}
