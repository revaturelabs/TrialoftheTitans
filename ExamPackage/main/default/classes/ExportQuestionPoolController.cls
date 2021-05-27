public class ExportQuestionPoolController {
  
    public Id currentQuestionPoolId{get;set;}
    public List <Question_Assignment__c> examQuestionAssignments {get;set;}
    public List <Exam_Question__c> currentExamQuestions{get;set;}
    public Set <Id> currentExamQuestionIds{get;set;}
    public Question_Assignment__c questionAssignment{get;set;}
    public String formattedQuestion{get;set;}
    public List<String> allFormattedQuestions{get;set;}
    public String allFormattedQuestionsString{get; set;}
    
    public ExportQuestionPoolController(ApexPages.StandardController controller){
       	currentQuestionPoolId = ApexPages.currentPage().getparameters().get('id');
        //currentQuestionPoolId ='a0A1F000005izbeUAA';
        currentExamQuestionIds = new Set <Id>();
        questionAssignment = [SELECT id FROM Question_Assignment__c WHERE Question_Pool__c = :currentQuestionPoolId LIMIT 1];
        examQuestionAssignments=[SELECT Id, Exam_Question__c FROM Question_Assignment__c WHERE Question_Pool__c = :currentQuestionPoolId];
        for(Question_Assignment__c QA: examQuestionAssignments){
            currentExamQuestionIds.add(QA.Exam_Question__c);
        }
        
        currentExamQuestions = [SELECT Missing_Word__c, Answer_Explanation__c, Correct_Answer_s__c, options__c, Question_Text__c, Question_Type__c, Skill__c, Name
	                            FROM Exam_Question__c WHERE id in :currentExamQuestionIds];
        formattedQuestion =''; 
		allFormattedQuestions = new List<String>();
        allFormattedQuestionsString ='';
        export(currentExamQuestions);
        formatQuestions(allFormattedQuestions);
    }
   
    public void export(List<Exam_Question__c> currentExamQuestions){
        for(Exam_Question__c currentExamQuestion : currentExamQuestions){
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
    }
        
    /*------------------------------ Multiple Choice Question--------------------------------------------------*/
    public String formatMultipleChoiceQuestionMW(Exam_Question__c question, String beforeSubstring, String afterSubstring){
        String incorrectAnswerString = getIncorrectAnswers(question);
        formattedQuestion = '::' + question.Name + '::' + beforeSubstring + '{='+ question.Correct_Answer_s__c+ incorrectAnswerString +getCorrectAnswer(question)+ '}' + afterSubstring;
        allFormattedQuestions.add(formattedQuestion);
        return formattedQuestion;
    }
    
    
    public void formatMultipleChoiceQuestion(Exam_Question__c question){
        String incorrectAnswerString = getIncorrectAnswers(question);
        // GIFT format for MC: ::QuestionName:: QuestionText {= correctAnswer #comment ~incorrectanswers}
        formattedQuestion='::' + question.Name + '::' + question.Question_Text__c +'{='+ question.Correct_Answer_s__c
            + incorrectAnswerString +getCorrectAnswer(question)+ '}' ;
        allFormattedQuestions.add(formattedQuestion);
        system.debug('Formatted Question: '+ formattedQuestion);
        system.debug('all formatted questions: ' + allFormattedQuestions);
    }
    
    /************************* Multiple Choice Multi-Select Question *****************************/
    public void formatMultipleChoiceQuestionMultipleAnswers(Exam_Question__c question){
        String incorrectAnswerString = getIncorrectAnswersMultiSelect(question);
        String correctAnswerString = getCorrectAnswersMultiSelect(question);
        formattedQuestion = '::' + question.Name + '::' + question.Question_Text__c + '{' + correctAnswerString + incorrectAnswerString +getCorrectAnswer(question)+ '}';
        allFormattedQuestions.add(formattedQuestion);
        
    }
    public void formatMultipleChoiceQuestionMultipleAnswersMW(Exam_Question__c question, String beforeSubstring, String afterSubstring){
        String incorrectAnswerString = getIncorrectAnswersMultiSelect(question);
        String correctAnswerString = getCorrectAnswersMultiSelect(question);
        formattedQuestion = '::' + question.Name + '::' + beforeSubstring + '{' + correctAnswerString + incorrectAnswerString +getCorrectAnswer(question)+ '}' + afterSubstring;
        allFormattedQuestions.add(formattedQuestion);
    }
    /*--------------------------- Get Answers Functions -------------------------------------------*/
     public String getCorrectAnswers (Exam_Question__c question){
        List <String> correctAnswers = new List <String>();
        correctAnswers = question.Correct_Answer_s__c.split('\\|\\|'); 
       String correctAnswerString = string.join(correctAnswers, '');
        return correctAnswerString;
    }
    public String getIncorrectAnswers (Exam_Question__c question){
        List <String> options = new List <String>();
        options = question.Options__c.split('\\|\\|');
        system.debug('options: ' + options);
        List<String> incorrectAnswers = new List<String>();
        for(String option : options){ 
            if(option!= question.Correct_Answer_s__c){
                incorrectAnswers.add('~'+option);
            }}  
       String incorrectAnswerString = string.join(incorrectAnswers, '');
        return incorrectAnswerString;
    }
    
      public String getCorrectAnswersMultiSelect (Exam_Question__c question){
        List <String> correctAnswers = new List <String>();
        List<String> res = new List <String>();
        correctAnswers = question.Correct_Answer_s__c.split('\\|\\|'); 
        Integer numCorrectAnswers = correctAnswers.size();
          Integer percentQuestion = 100/numCorrectAnswers;
          String correctAnswerPercent = String.valueOf(percentQuestion);
          for(String correctAnswer: correctAnswers){
              res.add('~%' + correctAnswerPercent + '%' + correctAnswer);
          }
       	String correctAnswerString = string.join(res, '');
        return correctAnswerString;
    }
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
    public void formatTrueFalseQuestion(Exam_Question__c question){
        formattedQuestion ='::' + question.Name+'::'+ question.Question_Text__c + '{'+question.Correct_Answer_s__c+getCorrectAnswer(question)+'}';
        allFormattedQuestions.add(formattedQuestion);
    }
    
    public void formatTrueFalseQuestionMW (Exam_Question__c question, String beforeSubstring, String afterSubstring){
        formattedQuestion = '::' + question.Name + '::' + beforeSubstring + '{'+ question.Correct_Answer_s__c +getCorrectAnswer(question)+ '}' + afterSubstring;
        allFormattedQuestions.add(formattedQuestion);
    }
    /*------------------------------ Matching Questions--------------------------------------------------*/
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
    public void formatShortAnswerQuestionMW(Exam_Question__c question, String beforeSubstring, String afterSubstring){
        List <String> correctAnswers = new List <String> ();
        List <String> formattedCorrectAnswers = new List <String>();
		correctAnswers = question.Correct_Answer_s__c.split('\\|\\|');
        for (String correctAnswer : correctAnswers){
           formattedCorrectAnswers.add('='+correctAnswer);
        }
        String correctAnswersString = string.join(formattedCorrectAnswers, '');
        formattedQuestion = '::' + question.Name + '::' + beforeSubstring + '{'+ correctAnswersString +getCorrectAnswer(question)+ '}' + afterSubstring;
        allFormattedQuestions.add(formattedQuestion);
    }
     /*------------------------------ Numerical Question --------------------------------------------------*/
    public void formatNumericalQuestion(Exam_Question__c question){
        formattedQuestion = '::' + question.Name + '::'+question.Question_Text__c + '{#' + question.Correct_Answer_s__c + ':0'+getCorrectAnswer(question)+'}';
        allFormattedQuestions.add(formattedQuestion);
    }
    public void formatNumericalQuestionMW(Exam_Question__c question, String beforeSubstring, String afterSubstring){
        formattedQuestion = '::' + question.Name + '::'+ beforeSubstring + '{#' + question.Correct_Answer_s__c + ':0' +getCorrectAnswer(question)+'}' + afterSubstring;
        allFormattedQuestions.add(formattedQuestion);
    }
    
   /*------------------------------ Short Answer Question --------------------------------------------------*/
    public void formatShortAnswerQuestion(Exam_Question__c question){
        List <String> correctAnswers = new List<String>();
        List <String> formattedCorrectAnswers = new List <String>();
        correctAnswers = question.Correct_Answer_s__c.split('\\|\\|');
          for (String correctAnswer : correctAnswers){
           formattedCorrectAnswers.add('='+correctAnswer);
        }
        String correctAnswersString = string.join(formattedCorrectAnswers, '');
        formattedQuestion = '::' + question.Name + '::'+question.Question_Text__c + '{'+ correctAnswersString+ getCorrectAnswer(question) +'}';
        allFormattedQuestions.add(formattedQuestion);
    }
  /*------------------------------ Essay Question --------------------------------------------------*/
    public void formatEssayQuestion(Exam_Question__c question){
        formattedQuestion='::' + question.Name + '::' + question.Question_Text__c+'{}';
        allFormattedQuestions.add(formattedQuestion);
    }
    public void formatEssayQuestionMW(Exam_Question__c question, String beforeSubstring, String afterSubstring){
        formattedQuestion='::' + question.Name + '::' + beforeSubstring+'{}'+afterSubstring;
        allFormattedQuestions.add(formattedQuestion);
    }
  /*------------------------------ Join List to String--------------------------------------------------*/    
    public void formatQuestions(List <String> questions){ 
    	allFormattedQuestionsString = string.join(questions, '\r\n\r\n');
    }
    public String getCorrectAnswer(Exam_Question__c question){
        String res = '';
        if(question.Answer_Explanation__c != null){
            res= '#'+question.Answer_Explanation__c;
        }
        return res;
    }
    
}