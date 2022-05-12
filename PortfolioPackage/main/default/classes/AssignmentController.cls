public with sharing class AssignmentController {
    @AuraEnabled(cacheable=true)
<<<<<<< HEAD
    public static List<ExamtoSkill__c> getExams(String skill) {
         return [
            SELECT Name, Skill__r.Name, Exam__r.Name 
            FROM ExamtoSkill__c 
            WHERE Skill__r.Name =: skill
        ];
    }
}
=======
    public static List<ExamtoSkill__c> getExams() {
         return [
            SELECT Name, Skill__r.Name, Exam__r.Name 
            FROM ExamtoSkill__c 
            WHERE Skill__r.Name = 'Skill 75'
        ];
    }
}
>>>>>>> 1ca2866c4065b0e6d75dfd38e8aeb2e3e8ea250d
