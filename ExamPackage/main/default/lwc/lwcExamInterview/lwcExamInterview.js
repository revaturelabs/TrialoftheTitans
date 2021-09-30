/**
 * @description       : Creates questions and allows users to submit to the server
 * @author            : Austin Ulberg, Daniel Boice
 * @group             : 
 * @last modified on  : 09-30-2021
 * @last modified by  : Daniel Boice
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   09-30-2021   Daniel Boice   Initial Version
**/
import { LightningElement, api, wire, track } from 'lwc';
import exam from '@salesforce/schema/Exam__c';
import titan from '@salesforce/schema/Titan__c';
import Question from '@salesforce/schema/Exam_Question__c';
import QuestionType from '@salesforce/schema/Exam_Question__c.Question_Type__c'
import QuestionAnswer from '@salesforce/schema/Hero_Answer__c.Answer_Choice__c'
import examFinder from '@salesforce/apex/ExamInterviewApexController.examFinder';

const FIELDS =[
    'Exam_Question__c.Question_Type__c',
    'Exam_Question__c.Id'
] 

export default class LwcExamInterview extends LightningElement {


exam;
titan;
titanName;
error;

@track
examQuestionsI;
@track
errorI;


examQuestions;
examAnswers;

//Index for questions
questionNumber = 0;
questionAmount;
questionsLoaded;
examId;
question;
questionType;
questionNumberTitleText="test";
displayMatchingType=false;
displayShortType=false;
displayMultipleChoiceType=false;
displayMultiMultipleChoiceType=false;
displayTrueType=false;
displayNumberType=false;
displayEssayType=false;




@wire(examFinder, {examID:null})
wiredExamQuestions({ error, data }) {
    console.log('wired exam questions function called');
    if (data) {
    console.log(data);
    this.examQuestions = data;
    this.error = undefined;
    this.question=data[0];
    this.setDisplayBoolValues();
  } else if (error) {
    this.error = error;
    this.examQuestions = undefined;
    console.log(error);
  }
}

connectedCallback() {
 

  examFinder()
    .then((result) => {
      this.examQuestionsI = result;
    })
    .catch((error) => {
      this.errorI = error;
    });
}

 

    get question(){}
   
  
//Set Display values based on question type to conditionally render question type components

setDisplayBoolValues(){
    console.log('set display bool values function fired');
    if(typeof this.question !='undefined'){
        console.log("question defined");
        console.log(this.question.Question_Type__c)
        switch (this.question.Question_Type__c) {
            case "Matching":
                if(!this.displayMatchingType){
                    switch(true){
                        case this.displayShortType:
                            this.displayShortType = false;
                            break;
                        case  this.displayMultipleChoiceType:
                            this.displayMultipleChoiceType = false;
                            break;
                        case this.displayMultiMultipleChoiceType:
                            this.displayMultiMultipleChoiceType = false;
                            break;
                        case this.displayTrueType:
                            this.displayTrueType = false;
                            break;
                        case this.displayNumberType:
                            this.displayNumberType = false;
                            break;
                        case  this.displayEssayType:
                            this.displayEssayType = false;
                    }
                    this.displayMatchingType = true;
                }
                break;
            case "Numerical":
                if(!this.displayNumberType){
                    switch(true){
                        case this.displayShortType:
                            this.displayShortType = false;
                            break;
                        case this.displayMatchingType:
                            this.displayMatchingType = false;
                            break;
                        case  this.displayMultipleChoiceType:
                            this.displayMultipleChoiceType = false;
                            break;
                        case this.displayMultiMultipleChoiceType:
                            this.displayMultiMultipleChoiceType = false;
                            break;
                        case this.displayTrueType:
                            this.displayTrueType = false;
                            break;
                        case this.displayNumberType:
                            this.displayNumberType = false;
                            break;
                        case  this.displayEssayType:
                            this.displayEssayType = false;
                    }
                    this.displayNumberType = true;
                }
                break;   
            case "Essay":
                if(!this.displayEssayType){
                    switch(true){
                        case this.displayShortType:
                            this.displayShortType = false;
                            break;
                        case this.displayMatchingType:
                            this.displayMatchingType = false;
                            break;
                        case  this.displayMultipleChoiceType:
                            this.displayMultipleChoiceType = false;
                            break;
                        case this.displayMultiMultipleChoiceType:
                            this.displayMultiMultipleChoiceType = false;
                            break;
                        case this.displayTrueType:
                            this.displayTrueType = false;
                            break;
                        case this.displayNumberType:
                            this.displayNumberType = false;
                            break;
                        case  this.displayEssayType:
                            this.displayEssayType = false;   
                    }
                    this.displayEssayType = true;
                    console.log('set display essay type to '+this.displayEssayType);
                }
                break;
            case "Short answer":
                if(!this.displayShortType){
                    switch(true){
                        case this.displayMatchingType:
                            this.displayMatchingType = false;
                            break;
                        case  this.displayMultipleChoiceType:
                            this.displayMultipleChoiceType = false;
                            break;
                        case this.displayMultiMultipleChoiceType:
                            this.displayMultiMultipleChoiceType = false;
                            break;
                        case this.displayTrueType:
                            this.displayTrueType = false;
                            break;
                        case this.displayNumberType:
                            this.displayNumberType = false;
                            break;
                        case  this.displayEssayType:
                            this.displayEssayType = false;
                    }
                    this.displayShortType = true;
            }
                break;
            case "Multiple Choice":
                if(!this.displayMultipleChoiceType){
                    switch(true){
                        case this.displayShortType:
                            this.displayShortType = false;
                            break;
                        case  this.displayMatchingType:
                            this.displayMultipleChoiceType = false;
                            break;
                        case this.displayMultiMultipleChoiceType:
                            this.displayMultiMultipleChoiceType = false;
                            break;
                        case this.displayTrueType:
                            this.displayTrueType = false;
                            break;
                        case this.displayNumberType:
                            this.displayNumberType = false;
                            break;
                        case  this.displayEssayType:
                            this.displayEssayType = false;
                    }
                    this.displayMultipleChoiceType = true;
                }
                break;
            case "Multiple Choice - multiple answers":
                if(!this.displayMultiMultipleChoiceType){
                    switch(true){
                        case this.displayShortType:
                            this.displayShortType = false;
                            break;
                        case  this.displayMatchingType:
                            this.displayMultipleChoiceType = false;
                            break;
                        case this.displayMultipleChoiceType:
                            this.displayMultipleChoiceType = false;
                            break;
                        case this.displayTrueType:
                            this.displayTrueType = false;
                            break;
                        case this.displayNumberType:
                            this.displayNumberType = false;
                            break;
                        case  this.displayEssayType:
                            this.displayEssayType = false;
                    }
                    this.displayMultiMultipleChoiceType = true;
                }
                break;
            case "True-false":
                if(!this.displayTrueType){
                   
                    switch(true){
                        case this.displayShortType:
                            this.displayShortType = false;
                            break;
                        case  this.displayMatchingType:
                            this.displayMultipleChoiceType = false;
                            break;
                        case this.displayMultipleChoiceType:
                            this.displayMultipleChoiceType = false;
                            break;
                        case this.displayMultiMultipleChoiceType:
                            this.displayMultiMultipleChoiceType = false;
                            break;
                        case this.displayNumberType:
                            this.displayNumberType = false;
                            break;
                        case  this.displayEssayType:
                            this.displayEssayType = false;
                    }
                    this.displayTrueType = true;
                }                       
            default:
                break;
        }
    }
        
    }
   //Create map  mapping current answers to question number 
   //has to get the answer from child component we render for the question type
   // they use a sosl query to get the child component and then get its answer
   //need to create a new varible to hold the current component that is currently rendered
   //so we can call the answer function on the childcomponent to get the answer and map it to the map

    retrieveAnswer(){
      this.examAnswers.map(getAnswers)
      function getAnswers(answer, questionNumber){
       answer =  question.answer;
       return[questionNumber, answer];

      }
      console.log(this.examAnswers)
       // this.examAnswers[this.questionNumber]

    }    

    prevClicked(){
        this.questionNumber--;
        this.question = this.examQuestions[this.questionNumber];
        
    }
    nextClicked(){
        this.questionNumber++;
        this.question = this.examQuestions[this.questionNumber];
    }
submitExam(){


}

}

