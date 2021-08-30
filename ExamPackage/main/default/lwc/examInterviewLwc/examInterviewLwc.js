import { LightningElement, api } from 'lwc';
import examFinder from '@salesforce/apex/ExamInterviewApexController.examFinder';//(String examID)

export default class ExamInterviewLwc extends LightningElement {

    @api body;
    @api examQuestions;
    @api questionAmount;
    @api examId; //idk where this comes from/does

    @api matching = false;
    @api matchId;
    @api matchQuestion;
    @api matchOptions;
    @api matchAnswers;
    @api matchPrompt;

    @api numerical = false; 
    @api numericalId;
    @api numericalQuestion;
    @api numericalPrompt;
    @api numericalAnswer;

    @api essay = false;
    @api essayId;
    @api essayQuestion;
    @api essayEssayQuestion;
    @api essayAnswer;

    @api shortAnswerBool = false; 
    @api shortId;
    @api shortQuestion;
    @api shortShortQuestion;
    @api shortAnswer;

    @api multipleChoice = false;
    @api multipleId;
    @api multipleQuestion;
    @api multipleRadio;
    @api multiplePrompt;
    @api multipleCorrect;

    @api multipleChoiceMultipleAnswers = false; 
    @api multiAnsId;
    @api multiAnsCheck;
    @api multiAnsQuestion;
    @api multiAnsPrompt;
    @api multiAnsCorrect;

    @api trueFalse = false; 
    @api trueFalseId;
    @api trueFalseQuestion;
    @api trueFalsePrompt;
    @api trueFalseCorrect;
    @api i; 
    @api exam; 

    constructor(){
      super();
      this.i = 0; 
      this.loadExamHelper();
    }

    async loadExamHelper (){
      this.exam = await examFinder({"examID" : examId});
      this.questionAmount = this.exam.length;
        //this.callExam();
        var examId = this.examId;
        var cntr;

                cntr = 1;
                   
                   var question = this.exam[this.i];

                    if(question.Question_Type__c === "Matching"){
                        this.matching = true;  
                        this.matchId = "Question " + cntr;
                        this.matchQuestion = question;
                        this.matchOptions = question.Options__c;
                        this.matchAnswers = question.Correct_Answer_s__c;
                        this.matchPrompt = "Question " + cntr + " : " + question.Question_Text__c;
                        
                        cntr++;
                    }
                    if(question.Question_Type__c === "Numerical"){
                        this.numerical = true;   
                        this.numericalId = "Question " + cntr;
                        this.numericalQuestion = question;
                        this.numericalPrompt = "Question " + cntr + " : " + question.Question_Text__c;
                        this.numericalAnswer = question.Correct_Answer_s__c; 
                            
                        cntr++;
                    }
                    if(question.Question_Type__c === "Essay"){
                        this.essay = true;     
                        this.essayId = "Question " + cntr;
                        this.essayQuestion = question;
                        this.essayEssayQuestion = "Question " + cntr + " : " + question.Question_Text__c;
                        this.essayAnswer = question.Correct_Answer_s__c;
                        
                        cntr++;
                    }
                    if(question.Question_Type__c === "Short answer"){
                        this.shortAnswerBool = true; 
                            this.shortId = "Question " + cntr;
                            this.shortQuestion = question;
                            this.shortShortQuestion = "Question " + cntr + " : " + question.Question_Text__c;
                            this.shortAnswer = question.Correct_Answer_s__c;
                                         
                        cntr++;
                    }
                    if(question.Question_Type__c === "Multiple Choice"){
                        this.multipleChoice = true; 
                            
                            this.multipleId = "Question " + cntr;
                            this.multipleQuestion = question;
                            this.multipleRadio = question.Options__c;
                            this.multiplePrompt = "Question " + cntr + " : " + question.Question_Text__c;
                            this.multipleCorrect = question.Correct_Answer_s__c;
                 
                        cntr++;
                    }
                    if(question.Question_Type__c === "Multiple Choice - multiple answers"){
                        this.multipleChoiceMultipleAnswers = true; 
                            
                            this.multiAnsId = "Question " + cntr;
                            this.multiAnsCheck = question.Options__c;
                            this.multiAnsQuestion = question;
                            this.multiAnsPrompt = "Question " + cntr + " : " + question.Question_Text__c;
                            this.multiAnsCorrect = question.Correct_Answer_s__c;
                       
                        cntr++;
                    }
                    if(question.Question_Type__c === "True-false"){
                        this.trueFalse = true; 
                            
                            this.trueFalseId = "Question " + cntr;
                            this.trueFalseQuestion = question;
                            this.trueFalsePrompt = "Question " + cntr + " : " + question.Question_Text__c;
                            this.trueFalseCorrect = question.Correct_Answer_s__c;
                        
                        cntr++;
                    }
                    this.body = question.Question_Text__c;            
    } 

     nextClick (){
       //hide titles
       if(this.questionAmount != this.i+1) {
      this.matching = false; 
      this.numerical = false; 
      this.essay = false; 
      this.shortAnswerBool = false; 
      this.multipleChoice = false; 
      this.multipleChoiceMultipleAnswers = false; 
      this.trueFalse = false; 
      this.i++; 
      this.body = ""; 
      this.loadExamHelper(); 
      }
     }
     prevClick (){
      //hide titles
      if(this.i-1 >= 0) {
     this.matching = false; 
     this.numerical = false; 
     this.essay = false; 
     this.shortAnswerBool = false; 
     this.multipleChoice = false; 
     this.multipleChoiceMultipleAnswers = false; 
     this.trueFalse = false; 
     this.i--; 
     this.body = ""; 
     this.loadExamHelper(); 
     }
    }
}