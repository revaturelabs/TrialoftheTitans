public class ExportQuestionsController {
    public Id currentQuestionId{get;set;}
    public Exam_Question__c currentExamQuestion{get;set;}
    public Id currentQuestionPoolId{get;set;}
    public ExportQuestionsController(){
       // currentQuestionId = ApexPages.currentPage().getparameters().get('id');
        currentQuestionId = 'a051F00000AM9xTQAT';
        currentExamQuestion = [SELECT Answer_Explanation__c, Correct_Answer_s__c, options__c, Question_Text__c, Question_Type__c, Skill__c, Name
                           FROM Exam_Question__c WHERE id = :currentQuestionId LIMIT 1];

    }
    public void formatQuestions(){    }
}