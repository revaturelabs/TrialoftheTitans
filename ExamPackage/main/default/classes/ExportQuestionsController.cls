public class ExportQuestionsController {
    /*------ Test ------*/
    public Id TF{get;set;}
    public Exam_Question__c TFQuestion{get;set;}
    /*-------------------*/
    public Id currentQuestionId{get;set;}
    public Exam_Question__c currentExamQuestion{get;set;}
    public String formattedQuestion{get;set;}
    public Id currentQuestionPoolId{get;set;}
    public List<String> allFormattedQuestions{get;set;}
    public String allFormattedQuestionsString{get; set;}
    
    public ExportQuestionsController(){
       // currentQuestionId = ApexPages.currentPage().getparameters().get('id');
        currentQuestionId = 'a051F00000AM9xTQAT';
        TF = 'a051F00000AM9zXQAT';
        currentExamQuestion = [SELECT Answer_Explanation__c, Correct_Answer_s__c, options__c, Question_Text__c, Question_Type__c, Skill__c, Name
                           FROM Exam_Question__c WHERE id =:currentQuestionId LIMIT 1];
        TFQuestion = [SELECT Answer_Explanation__c, Correct_Answer_s__c, options__c, Question_Text__c, Question_Type__c, Skill__c, Name
                      FROM Exam_Question__c WHERE id = :TF LIMIT 1];
		allFormattedQuestions = new List<String>();
		//System.debug('TF Question: '+ TFQuestion);       
		formatMultipleChoiceQuestion(currentExamQuestion);
        formatTrueFalseQuestion(TFQuestion);
        formatQuestions(allFormattedQuestions);
    }
    /*------------------------------ Multiple Choice Question--------------------------------------------------*/
    public void formatMultipleChoiceQuestion(Exam_Question__c question){
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
        allFormattedQuestions.add(formattedQuestion);
        system.debug('Formatted Question: '+ formattedQuestion);
        system.debug('all formatted questions: ' + allFormattedQuestions);
    }
  /*------------------------------ True or False Question--------------------------------------------------*/

    public void formatTrueFalseQuestion(Exam_Question__c question){
        formattedQuestion ='::' + question.Name+'::'+ question.Question_Text__c + ' {'+question.Correct_Answer_s__c+'}';
        allFormattedQuestions.add(formattedQuestion);
    }
    public void formatQuestions(List <String> questions){ 
    allFormattedQuestionsString = string.join(questions, '\n');
    }
}