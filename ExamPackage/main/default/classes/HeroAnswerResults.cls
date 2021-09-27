public with sharing class HeroAnswerResults {
	@AuraEnabled(cacheable=true)
    public static List<Hero_Answer__c> getHeroResults(Id examResultId){
        
        List<Hero_Answer__c> heroResults = [SELECT Name, Correct__c, Answer_Choice__c, Exam_Result__r.Name, Exam_Question__r.Name, Exam_Question__r.Question_Text__c, Exam_Question__r.Options__c, Exam_Question__r.Correct_Answer_s__c 
                                            FROM Hero_Answer__c
                                            WHERE Exam_Result__c=:examResultId WITH SECURITY_ENFORCED];
        return heroResults;
    }
    
}