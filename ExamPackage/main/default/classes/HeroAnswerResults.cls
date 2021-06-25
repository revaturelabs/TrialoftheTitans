public class HeroAnswerResults {
	@AuraEnabled
    public static List<Hero_Answer__c> getHeroResults(){
        
        List<Hero_Answer__c> heroResults = [SELECT Name, Correct__c, Answer_Choice__c, Exam_Result__r.Name, Exam_Question__r.Name, Exam_Question__r.Question_Text__c, Exam_Question__r.Options__c, Exam_Question__r.Correct_Answer_s__c 
                                            FROM Hero_Answer__c
                                            WHERE Exam_Result__c='a075e000001WG3VAAW'];
        return heroResults;
    }
    
}