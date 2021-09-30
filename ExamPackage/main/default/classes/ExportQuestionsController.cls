public class ExportQuestionsController {
    //Properties
    //currentQuestionId: the ID of the Exam Question that is being exported
    //currentExamQuestion: Exam Question Object that holds the fields of the current Exam Object from the query 
    //formattedQuestion: current Exam Question after being translated to GIFT format
    //allFormattedQuestions: Used to include more than one question, adds all GIFT formatted questions to a list
    //allFormattedQuestionsString: casts list of formatted questions to a string to display on the visualforce page
    public Id currentQuestionId{get;set;}
    public Exam_Question__c currentExamQuestion{get;set;}
    public String formattedQuestion{get;set;}
    public List<String> allFormattedQuestions{get;set;}
    public String allFormattedQuestionsString{get; set;}

    //Constructor:
    //Standard Controller for Exam_Question__c
    public ExportQuestionsController(ApexPages.StandardController controller){
       	currentQuestionId = ApexPages.currentPage().getparameters().get('id');
        currentExamQuestion = [SELECT Missing_Word__c, Answer_Explanation__c, Correct_Answer_s__c, options__c, Question_Text__c, Question_Type__c, Name
	                           FROM Exam_Question__c WHERE id =:currentQuestionId LIMIT 1];
        //this.currentExamQuestion = (Exam_Question__c)controller.getRecord();
        system.debug(currentExamQuestion);
        formattedQuestion ='';
		allFormattedQuestions = new List<String>();
        export(currentExamQuestion);
        formatQuestions(allFormattedQuestions);
       // returnToRecordPage();
    }
   //export: takes the current Exam Question and checks whether it is a Missing Word Question or Not and calls the methods accordingly
   //param: Exam_Question__c 
   //delimeter: all the mising word questions' fill in the blank area is indicated with five underscores
   //beforeSubstring: obtains the question text before the delimeter
   //afterSubstring: obtains the question text after the delimeter
    public void export(Exam_Question__c currentExamQuestion){
        if(currentExamQuestion.Missing_Word__c == TRUE){
            String delimeter ='_____';
            String beforeSubstring = currentExamQuestion.Question_Text__c.substringBefore(delimeter);
            String afterSubstring = currentExamQuestion.Question_Text__c.substringAfter(delimeter);
            switch on currentExamQuestion.Question_Type__c{
                when 'Multiple Choice'{
                    formatMultipleChoiceQuestionMW(currentExamQuestion, beforeSubstring, afterSubstring);
                }
                when 'True-false'{
                    formatTrueFalseQuestionMW(currentExamQuestion, beforeSubstring, afterSubstring);
                }
                when 'Matching'{
                    formatMatchingQuestionMW(currentExamQuestion, beforeSubstring, afterSubstring);
                }
                when 'Multiple Choice - multiple answers'{
                    formatMultipleChoiceQuestionMultipleAnswersMW(currentExamQuestion, beforeSubstring, afterSubstring);
                }
                when 'Numerical'{
                    formatNumericalQuestionMW(currentExamQuestion, beforeSubstring, afterSubstring);
                }
                when 'Short answer'{
                    formatShortAnswerQuestionMW(currentExamQuestion, beforeSubstring, afterSubstring);
                }
                when 'Essay'{
                    formatEssayQuestionMW(currentExamQuestion, beforeSubstring, afterSubstring);
                }
            
                
                
            }
                
            }
        else{
            switch on currentExamQuestion.Question_Type__c{
                when 'Multiple Choice'{
                    formatMultipleChoiceQuestion(currentExamQuestion);
                }
                when 'True-false'{
                    formatTrueFalseQuestion(currentExamQuestion);
                }
                when 'Matching'{
                    formatMatchingQuestion(currentExamQuestion);
                }
                when 'Multiple Choice - multiple answers'{
                    formatMultipleChoiceQuestionMultipleAnswers(currentExamQuestion);
                }
                when 'Numerical'{
                    formatNumericalQuestion(currentExamQuestion);
                }
                when 'Short answer'{
                    formatShortAnswerQuestion(currentExamQuestion);
                }
                when 'Essay'{
                    formatEssayQuestion(currentExamQuestion);
                }
            }
        }
        
        
    }
        
 
    /*------------------------------ Multiple Choice Question--------------------------------------------------*/
     //formats Multiple Choice and Missing Word questions 
    //params-
    //question: the exam question being formatted
    //beforeSubstring: substring before the delimeter 
    //afterSubstring: substring after the delimeter
    
    public String formatMultipleChoiceQuestionMW(Exam_Question__c question, String beforeSubstring, String afterSubstring){

        formattedQuestion = '::' + question.Name + '::' + beforeSubstring + '{'+ getAnswerFormat(question)+'}'+afterSubstring;
        allFormattedQuestions.add(formattedQuestion);
        return formattedQuestion;
    }
    
    //formats Multiple Choice questions 
    //GIFT format for MC: ::QuestionName:: QuestionText {= correctAnswer #comment ~incorrectanswers}
    //params-
    //question: the exam question being formatted
    
    public void formatMultipleChoiceQuestion(Exam_Question__c question){
        
        // GIFT format for MC: ::QuestionName:: QuestionText {= correctAnswer #comment ~incorrectanswers}
        formattedQuestion='::' + question.Name + '::' + question.Question_Text__c +'{'+getAnswerFormat(question)+ '}' ;
        allFormattedQuestions.add(formattedQuestion);
        system.debug('Formatted Question: '+ formattedQuestion);
        system.debug('all formatted questions: ' + allFormattedQuestions);
    }
    
    /************************* Multiple Choice Multi-Select Question *****************************/
   //formats Multiple Choice with Multiple Answers and Missing Word questions 
    //params-
    //question: the exam question being formatted
    public void formatMultipleChoiceQuestionMultipleAnswers(Exam_Question__c question){
        formattedQuestion = '::' + question.Name + '::' + question.Question_Text__c + '{'+getAnswersMultiSelect(question)+ '}';
        allFormattedQuestions.add(formattedQuestion);
        
    }
    
    //formats Multiple Choice with Multiple Answers and Missing Word questions 
    //params-
    //question: the exam question being formatted
    public void formatMultipleChoiceQuestionMultipleAnswersMW(Exam_Question__c question, String beforeSubstring, String afterSubstring){
        formattedQuestion = '::' + question.Name + '::' + beforeSubstring + '{'+ getAnswersMultiSelect(question)+'}' + afterSubstring;
        allFormattedQuestions.add(formattedQuestion);
    }
    /*--------------------------- Get Answers Functions -------------------------------------------*/
    
    public String getCorrectAnswers(Exam_Question__c question){
   		List <String> correctAnswers = new List<String>();
        List <String> answerExplanations = new List <String>();
        List <String> allAnswers = new List <String>();
        if(correctAnswers.contains('|')==false){
            if(question.Answer_Explanation__c != null){
                return '='+question.Correct_Answer_s__c+'#'+question.Answer_Explanation__c;
            }
            else{
                return '='+question.Correct_Answer_s__c;
            }
        }
        correctAnswers = question.Correct_Answer_s__c.split('\\|\\|');
        if(question.Answer_Explanation__c !=null){
        answerExplanations = question.Answer_Explanation__c.split('\\|\\|');
            if(question.Answer_Explanation__c.subString(question.Answer_Explanation__c.length()-1) == '|'){
                answerExplanations.add('');
            }
            system.debug(answerExplanations);
        }

        for (Integer i =0; i<correctAnswers.size();i++){
            
                if ( question.Answer_Explanation__c ==null) {
                    allAnswers.add('='+ correctAnswers[i]);
                } 
                else if(String.isBlank(answerExplanations[i])){
                    allAnswers.add('='+ correctAnswers[i]);
                }
                    
                    else {
                    allAnswers.add('='+ correctAnswers[i] + '#'+answerExplanations[i]);
                }
            
        }
       String allAnswersString = string.join(allAnswers, '');
        return allAnswersString;
    }
    // Gets the incorrect answers and formats them to match GIFT format for incorrect answers
    // params-
    // question: current Exam Question 
    public String getAnswerFormat (Exam_Question__c question){
        List <String> options = new List <String>();
        List <String> answerExplanations = new List <String>();
        List <String> allAnswers = new List <String>();
        options = question.Options__c.split('\\|\\|');
        if(question.Answer_Explanation__c !=null){
        answerExplanations = question.Answer_Explanation__c.split('\\|\\|');
            if(question.Answer_Explanation__c.subString(question.Answer_Explanation__c.length()-1) == '|'){
                answerExplanations.add('');
            }
            system.debug(answerExplanations);
        }

        for (Integer i =0; i<options.size();i++){
            if(question.Correct_Answer_s__c.contains(options[i])){
                if ( question.Answer_Explanation__c ==null) {
                    allAnswers.add('='+ options[i]);
                } 
                else if(String.isBlank(answerExplanations[i])){
                    allAnswers.add('='+ options[i]);
                }
                    
                    else {
                    allAnswers.add('='+ options[i] + '#'+answerExplanations[i]);
                }
            } else {
                if ( question.Answer_Explanation__c ==null) {
                    allAnswers.add('~'+ options[i]);
                } 
                else if(String.isBlank(answerExplanations[i])){
                    allAnswers.add('~'+ options[i]);
                } else {
                    allAnswers.add('~'+ options[i] + '#'+answerExplanations[i]);
                }
            }
        }
       String allAnswersString = string.join(allAnswers, '');
        return allAnswersString;
    }
    
    //Gets the correct Answers from a Multi Select Question and inputs the percentage each question is worth and formats incorrect answers 
    //params-
    //question: current Exam Question 
    //
      public String getAnswersMultiSelect (Exam_Question__c question){
        List <String> options = new List <String>();
        List <String> correctAnswers = new List <String>();
        List <String> answerExplanations = new List <String>();
        List <String> allAnswers = new List <String>();
        options = question.Options__c.split('\\|\\|');
         if(question.Answer_Explanation__c !=null){
        answerExplanations = question.Answer_Explanation__c.split('\\|\\|');
             if(question.Answer_Explanation__c.subString(question.Answer_Explanation__c.length()-1) == '|'){
                answerExplanations.add('');
            }
            system.debug(answerExplanations);
       
        }
        correctAnswers = question.Correct_Answer_s__c.split('\\|\\|');
          Integer numCorrectAnswers = correctAnswers.size();
          Integer percentQuestion = 100/numCorrectAnswers;
          String correctAnswerPercent = String.valueOf(percentQuestion);
        for (Integer i =0; i<options.size();i++){
            if(question.Correct_Answer_s__c.contains(options[i])){
                if ( question.Answer_Explanation__c ==null) {
                    allAnswers.add('~%' + correctAnswerPercent + '%'+ options[i]);
                } 
                else if(String.isBlank(answerExplanations[i])){
                    allAnswers.add('~%' + correctAnswerPercent + '%'+ options[i]);
                }
              else {
                    allAnswers.add('~%' + correctAnswerPercent + '%'+ options[i] + '#'+answerExplanations[i]);
                }
            } else {
                   if ( question.Answer_Explanation__c ==null) {
                    allAnswers.add('~%100%'+ options[i]);
                } 
                else if(String.isBlank(answerExplanations[i])){
                    allAnswers.add('~%100%'+ options[i]);
                }
                 else {
                    allAnswers.add('~%-100%'+ options[i] + '#'+answerExplanations[i]);
                }
            }
        }
       String allAnswersString = string.join(allAnswers, '');
        return allAnswersString;   
         
    }
    
    //Gets incorrect answers from multi select multiple choice questions and formats them
    //params-
    //question: current Exam Question
    public String getIncorrectAnswersMultiSelect (Exam_Question__c question){
        List <String> options = new List <String>();
        options = question.Options__c.split('\\|\\|');
        system.debug('options: ' + options);
        List<String> incorrectAnswers = new List<String>();
        for(String option : options){ 
            if(option!= question.Correct_Answer_s__c){
                incorrectAnswers.add('~%-100%'+option);
            }}  
       String incorrectAnswerString = string.join(incorrectAnswers, '');
        return incorrectAnswerString;
    }
    
    
  /*------------------------------ True or False Question--------------------------------------------------*/
    //Formats True-False Questions 
    //params-
    //question: current Exam Question
    public void formatTrueFalseQuestion(Exam_Question__c question){
        formattedQuestion ='::' + question.Name+'::'+ question.Question_Text__c + '{'+question.Correct_Answer_s__c+getCorrectAnswer(question)+'}';
        allFormattedQuestions.add(formattedQuestion);
    }
    
    //Formats True-False Questions with Missing Word
    //params-
    //question: current Exam Question
    public void formatTrueFalseQuestionMW (Exam_Question__c question, String beforeSubstring, String afterSubstring){
        formattedQuestion = '::' + question.Name + '::' + beforeSubstring + '{'+ question.Correct_Answer_s__c+getCorrectAnswer(question)+ '}' + afterSubstring;
        allFormattedQuestions.add(formattedQuestion);
    }
    /*------------------------------ Matching Questions--------------------------------------------------*/
    //Formats Matching Questions to GIFT format
    //params-
    //question: current Exam Question
    public void formatMatchingQuestion(Exam_Question__c question){
        List <String> optionList = new List <String>();
        List <String> answerList = new List <String>();
        List <String> matchAnswers = new List <String>();
        //Map <String, String> matchedAnswers = new Map <String,String>();
        optionList = question.Options__c.split('\\|\\|');
        answerList = question.Correct_Answer_s__c.split('\\|\\|');
        for(Integer i=0; i< optionList.size(); i++){
            matchAnswers.add('=' + optionList[i]);
            matchAnswers.add('->' + answerList[i]);
        }
        //String matchedAnswersString = String.valueOf(matchedAnswers);
        String matchedAnswersString = string.join(matchAnswers,'');
        formattedQuestion = '::' + question.Name + '::' + question.Question_Text__c  +'{'+ matchedAnswersString+ getCorrectAnswer(question)+'}' ;
        allFormattedQuestions.add(formattedQuestion);
    }
    
    //Formats Matching Questions with Missing Word to GIFT format
    //params-
    //question: current Exam Question
    public void formatMatchingQuestionMW (Exam_Question__c question, String beforeSubstring, String afterSubstring){
        List <String> optionList = new List <String>();
        List <String> answerList = new List <String>();
        List <String> matchAnswers = new List <String>();
        //Map <String, String> matchedAnswers = new Map <String,String>();
        optionList = question.Options__c.split('\\|\\|');
        answerList = question.Correct_Answer_s__c.split('\\|\\|');
        for(Integer i=0; i< optionList.size(); i++){
            matchAnswers.add('=' + optionList[i]);
            matchAnswers.add('->' + answerList[i]);
        }
        //String matchedAnswersString = String.valueOf(matchedAnswers);
        String matchedAnswersString = string.join(matchAnswers,'');
        formattedQuestion = '::' + question.Name + '::' + beforeSubstring  +'{'+ matchedAnswersString+ getCorrectAnswer(question) +'}'+ afterSubstring ;
        allFormattedQuestions.add(formattedQuestion);
    }
  /*------------------------------ Fill in the Blank Question--------------------------------------------------*/
    //formats the short answer questions with Missing Word
    //params-
    //question: current Exam Question
    public void formatShortAnswerQuestionMW(Exam_Question__c question, String beforeSubstring, String afterSubstring){
      
        formattedQuestion = '::' + question.Name + '::' + beforeSubstring + '{'+ getCorrectAnswers(question)+ '}' + afterSubstring;
        allFormattedQuestions.add(formattedQuestion);
    }
     /*------------------------------ Numerical Question --------------------------------------------------*/
     //Formats Numerical Questions
    //params-
    //question: current Exam Question
    public void formatNumericalQuestion(Exam_Question__c question){
        formattedQuestion = '::' + question.Name + '::'+question.Question_Text__c + '{#' + question.Correct_Answer_s__c + ':0'+getCorrectAnswer(question)+'}';
        allFormattedQuestions.add(formattedQuestion);
    }
     //Formats Numerical Questions with Missing Word
    //params-
    //question: current Exam Question
    public void formatNumericalQuestionMW(Exam_Question__c question, String beforeSubstring, String afterSubstring){
        formattedQuestion = '::' + question.Name + '::'+ beforeSubstring + '{#' + question.Correct_Answer_s__c + ':0' +getCorrectAnswer(question)+'}' + afterSubstring;
        allFormattedQuestions.add(formattedQuestion);
    }
    
   /*------------------------------ Short Answer Question --------------------------------------------------*/
    //formats the short answer questions
    //params-
    //question: current Exam Question
    public void formatShortAnswerQuestion(Exam_Question__c question){
        List <String> correctAnswers = new List<String>();
        List <String> formattedCorrectAnswers = new List <String>();
        correctAnswers = question.Correct_Answer_s__c.split('\\|\\|');
          for (String correctAnswer : correctAnswers){
           formattedCorrectAnswers.add('='+correctAnswer);
        }
        String correctAnswersString = string.join(formattedCorrectAnswers, '');
        formattedQuestion = '::' + question.Name + '::'+question.Question_Text__c + '{'+ getCorrectAnswers(question) +'}';
        allFormattedQuestions.add(formattedQuestion);
    }
  /*------------------------------ Essay Question --------------------------------------------------*/
    //formats Essay Question 
    //params-
    //question: current Exam Question
    public void formatEssayQuestion(Exam_Question__c question){
        formattedQuestion='::' + question.Name + '::' + question.Question_Text__c+'{}';
        allFormattedQuestions.add(formattedQuestion);
    }
    //formats Essay Question with Missing Word
    //params-
    //question: current Exam Question
    public void formatEssayQuestionMW(Exam_Question__c question, String beforeSubstring, String afterSubstring){
        formattedQuestion='::' + question.Name + '::' + beforeSubstring+'{}'+afterSubstring;
        allFormattedQuestions.add(formattedQuestion);
    }
  /*------------------------------ Join List to String--------------------------------------------------*/    
    //Casts the list of questions to a string 
    public String formatQuestions(List <String> questions){ 
    	allFormattedQuestionsString = string.join(questions, '\r\n\r\n');
        return allFormattedQuestionsString;
    }
    //gets the Answer Explanation and pre-pends a # to match GIFT format
    public String getCorrectAnswer(Exam_Question__c question){
        String res = '';
        if(question.Answer_Explanation__c != null){
            res= '#'+question.Answer_Explanation__c;
        }
        return res;
    }
    
     public void createFile(){
        ContentVersion conVer = new ContentVersion();
        conVer.ContentLocation = 'S'; // S specify this document is in SF, use E for external files
        conVer.PathOnClient = 'GIFT-'+System.now()+'.txt'; // The files name, extension is very important here which will help the file in preview.
        conVer.Title = 'GIFT-' +System.now(); // Display name of the files
        conVer.VersionData = Blob.valueOf(allFormattedQuestionsString); // converting your binary string to Blog
        insert conVer;
    }
    
}