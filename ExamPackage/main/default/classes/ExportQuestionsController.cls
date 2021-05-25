public class ExportQuestionsController {
    /*------ Test ------*/
    public Id TF{get;set;}
    public Exam_Question__c TFQuestion{get;set;}
    public Id FIB{get;set;}
    public Exam_Question__c FIBQuestion{get;set;}
    public Id Essay{get;set;}
    public Exam_Question__c EssayQuestion{get;set;}
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
        FIB = 'a051F00000AMBuSQAX';  
        Essay = 'a051F00000AMBucQAH';
        currentExamQuestion = [SELECT Answer_Explanation__c, Correct_Answer_s__c, options__c, Question_Text__c, Question_Type__c, Skill__c, Name
                           FROM Exam_Question__c WHERE id =:currentQuestionId LIMIT 1];
        TFQuestion = [SELECT Answer_Explanation__c, Correct_Answer_s__c, options__c, Question_Text__c, Question_Type__c, Skill__c, Name
                      FROM Exam_Question__c WHERE id = :TF LIMIT 1];
        FIBQuestion = [SELECT Answer_Explanation__c, Correct_Answer_s__c, options__c, Question_Text__c, Question_Type__c, Skill__c, Name
                      FROM Exam_Question__c WHERE id = :FIB LIMIT 1];
        EssayQuestion= [SELECT Answer_Explanation__c, Correct_Answer_s__c, options__c, Question_Text__c, Question_Type__c, Skill__c, Name
                      FROM Exam_Question__c WHERE id = :Essay LIMIT 1];
		allFormattedQuestions = new List<String>();
		//System.debug('TF Question: '+ TFQuestion);       
		formatMultipleChoiceQuestion(currentExamQuestion);
        formatTrueFalseQuestion(TFQuestion);
        formatFillInBlankQuestion(FIBQuestion);
        formatEssayQuestion(EssayQuestion);
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
  /*------------------------------ Fill in the Blank Question--------------------------------------------------*/
    public void formatFillInBlankQuestion(Exam_Question__c question){
        List <String> correctAnswers = new List <String> ();
        List <String> formattedCorrectAnswers = new List <String>();
        String delimeter = '_____';
		correctAnswers = question.Correct_Answer_s__c.split('\\|\\|');
        for (String correctAnswer : correctAnswers){
           formattedCorrectAnswers.add('='+correctAnswer);
        }
        String correctAnswersString = string.join(formattedCorrectAnswers, ' ');
        String beforeBlank = question.Question_Text__c.substringBefore(delimeter);
        String afterBlank = question.Question_Text__c.substringAfter(delimeter);
        formattedQuestion = '::' + question.Name + '::' + beforeBlank + '{'+ correctAnswersString + '}' + afterBlank;
        allFormattedQuestions.add(formattedQuestion);
    }
  /*------------------------------ Join List to String--------------------------------------------------*/
    public void formatEssayQuestion(Exam_Question__c question){
        formattedQuestion='::' + question.Name + '::' + question.Question_Text__c+'{}';
        allFormattedQuestions.add(formattedQuestion);
    }
  /*------------------------------ Join List to String--------------------------------------------------*/    
    public void formatQuestions(List <String> questions){ 
    	allFormattedQuestionsString = string.join(questions, '\n');
    }
}