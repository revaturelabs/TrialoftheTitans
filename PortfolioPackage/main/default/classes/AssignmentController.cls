public with sharing class AssignmentController {
    @AuraEnabled(cacheable=true)
    public static List<ExamtoSkill__c> getExams(String skill) {
         return [
            SELECT Name, Skill__r.Name, Exam__r.Name 
            FROM ExamtoSkill__c 
            WHERE Skill__r.Name =: skill
        ];
    }
}
