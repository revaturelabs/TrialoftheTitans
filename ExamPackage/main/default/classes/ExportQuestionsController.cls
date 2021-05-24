public class ExportQuestionsController {
    public Id currentQuestionId{get;set;}
    public Exam_Question__c currentExamQuestion{get;set;}
    public String formattedQuestion{get;set;}
    public Id currentQuestionPoolId{get;set;}
    public ExportQuestionsController(){
       // currentQuestionId = ApexPages.currentPage().getparameters().get('id');
        currentQuestionId = 'a051F00000AM9xTQAT';
        currentExamQuestion = [SELECT Answer_Explanation__c, Correct_Answer_s__c, options__c, Question_Text__c, Question_Type__c, Skill__c, Name
                           FROM Exam_Question__c WHERE id = :currentQuestionId LIMIT 1];
       
		formatMultipleChoiceQuestion(currentExamQuestion);
    }
    public String formatMultipleChoiceQuestion(Exam_Question__c question){
        // Getting Incorrect Answers
        List <String> options = new List <String>();
        options = question.Options__c.split('\\|\\|');
        system.debug('options: ' + options);
        List<String> incorrectAnswers = new List<String>();
        for(String option : options){
            if(option!= question.Correct_Answer_s__c){
                incorrectAnswers.add('~'+option);
            }} 
       String incorrectAnswerString = string.join(incorrectAnswers, ' ');
        // GIFT format for MC: ::QuestionName:: QuestionText {= correctAnswer #comment ~incorrectanswers}
        formattedQuestion='::' + question.Name + ':: ' + question.Question_Text__c +' {='+ question.Correct_Answer_s__c
            + incorrectAnswerString + '}' ;
        return formattedQuestion;
    }
    public void formatQuestions(){    }
}