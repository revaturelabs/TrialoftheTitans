/**
 * @description       : Creates questions and allows users to submit to the server
 * @author            : Austin Ulberg, Daniel Boice
 * @group             : 
 * @last modified on  : 10-02-2021
 * @last modified by  : Daniel Boice
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   09-30-2021   Daniel Boice   Initial Version
**/
import { LightningElement, api, wire, track } from 'lwc';
//import exam from '@salesforce/schema/Exam__c';
//import titan from '@salesforce/schema/Titan__c';
//import Question from '@salesforce/schema/Exam_Question__c';
//import QuestionType from '@salesforce/schema/Exam_Question__c.Question_Type__c'
//import QuestionAnswer from '@salesforce/schema/Hero_Answer__c.Answer_Choice__c'
import examFinder from '@salesforce/apex/ExamInterviewApexController.examFinder';
import submitAnswers from '@salesforce/apex/ExamInterviewApexController.submitAnswers';
import submitExam from '@salesforce/apex/ExamInterviewApexController.submitExam';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { loadScript } from "lightning/platformResourceLoader";
import CONFETTI from "@salesforce/resourceUrl/confetti";


export default class LwcExamInterview extends LightningElement {


    exam;
    titan;
    titanName;
    error;

    @track
    examQuestionsI;
    @track
    errorI;
    
    //hard coded an exam id and account id for testing, set by parent component
    @api
    examId='a0A0R000005gFOzUAM';
    @api
    accId='0010R00001LpBFRQA3';

    updateAnswers=true;
    examQuestions;
    answer="";
    examAnswers={};
    nextButtonDisabled=false;
    prevButtonDisabled=true;
    //Index for questions
    @track
    questionNumber = 0;
    questionAmount;
    questionsLoaded;
   
    questionI;
    questionType;
    confirmation='are you sure?';
    toastMessage = '';
    toastTitle ='';
    toastVariant='';
    //questionNumberTitleText="Question " + (this.questionNumber + 1) +":";
    numberOfQuestions;

    
    get questionNumberTitleText(){
        if(this.numberOfQuestions){
            return "Question " + (this.questionNumber + 1) +" (of "+ this.numberOfQuestions+"):";
        }
        else{
            return "Questions not loaded";

        }
    }
    //show celebrate button after submitting exam
    showCelebrateButton=false;
    submitButtonDisabled=false;
    //these display the components based on question type  
    displayMatchingType=false;
    displayShortType=false;
    displayMultipleChoiceType=false;
    displayMultiMultipleChoiceType=false;
    displayTrueType=false;
    displayNumberType=false;
    displayEssayType=false;
    
    @wire(examFinder, {examID:'$examId'})
    wiredExamQuestions({ error, data }) {
        console.log('wired exam questions function called');
        if (data) {
            console.log(data);
            this.examQuestions = data;
            this.numberOfQuestions = data.length;
            this.error = undefined;
            this.questionI=data[0];
            this.setDisplayBoolValues();
    } else if (error) {
            this.error = error;
            this.examQuestions = undefined;
            console.log(error);
    }
    }
    /*
    @wire(submitExam, {examId:'$examId'})
    submitExam
    
    @wire(submitAnswers, {examQuestionList:'$examQuestionList',examAnswerList:'$examAnswers'})
    submitAnswers
    */
    
    @api
    setDisplayBoolValues(){
        console.log('set display bool values fired in interview');
        const questionComponent = this.template.querySelector('c-lwc-question');
            if(questionComponent){
            console.log(this.questionI);
            questionComponent.question=this.questionI;
                questionComponent.setDisplayQuestionTypeBoolValues();
                this.setEssayTextAreaWithTitanAnswerForQuestion();
            }
            else{
                console.log('question component not loaded');
            }
    }
    // connectedCallback() {
    //     examFinder()
    //         .then((result) => {
    //         this.examQuestionsI = result;
    //         })
    //         .catch((error) => {
    //         this.errorI = error;
    //         });
    // }
    @track confirmation;
    
    submitConfirmationDetails = {
        text: 'Are you sure you want to submit your exam now?',
        confirmButtonLabel: 'Submit',
        confirmButtonVariant: 'neutral',
        cancelButtonLabel: 'Not Yet!',
        header: 'Confirm Submit'
    };
            
    
    
    // We pass the event to the function imported from the utility class along with the confirmation object
    handleModalButtonClick(event) {
        handleConfirmationButtonClick(event, this.confirmation);
    }
    
    
    //get question(){}
   
    answerUpdated(event){
        console.log("received answer updated event");
        //console.log(event.detail);
        if(this.updateAnswers){
            this.answer = event.detail;
        }
        console.log(this.answer);
    }
    retrieveAnswer(){
        console.log('retrieve answer fired');
        this.examAnswers[this.questionNumber.toString()] = this.answer;
        console.log(this.examAnswers);
    }    
    setPrevNextDisabled(){
        this.prevButtonDisabled=this.questionNumber<1;
        this.nextButtonDisabled=this.questionNumber===this.examQuestions.length-1;
    }
    prevClicked(){
        this.retrieveAnswer();
        if(this.questionNumber>0){
            this.questionNumber=parseInt(this.questionNumber, 10)-1;
            this.questionI = this.examQuestions[this.questionNumber];
           // this.questionNumberTitleText="Question " + (this.questionNumber + 1) +":";
        }
        this.setCurrentAnswer();
        this.setDisplayBoolValues();
        this.setPrevNextDisabled();
    }
    
    setCurrentAnswer(){
        console.log(this.answer);
        console.log("answer setting to null")
        this.answer="";
        if(this.examAnswers[this.questionNumber.toString()]){
            console.log("setting answer to "+this.examAnswers[this.questionNumber.toString()]);
            this.answer=this.examAnswers[this.questionNumber.toString()];
        }
    }

    nextClicked(){
        this.retrieveAnswer();
        if(this.questionNumber<this.examQuestions.length-1){
            console.log("question number is "+ this.questionNumber)
            this.questionNumber=parseInt(this.questionNumber, 10)+1;
            this.questionI = this.examQuestions[this.questionNumber];
            //this.questionNumberTitleText="Question " + (this.questionNumber + 1) +":";
        }
        this.setCurrentAnswer();
        this.setDisplayBoolValues();
        this.setPrevNextDisabled();
    }
    
    setEssayTextAreaWithTitanAnswerForQuestion(){
        //this.clearEssayTextArea();
        const essayQuestionComponent = this.template.querySelector('c-lwc-question');
        if(essayQuestionComponent){
            essayQuestionComponent.handleTextAreaSetTitanAnswer(this.examAnswers[this.questionNumber.toString()]);
        }
    }
    handleSubmitClick(event) {
        /*this.confirmation = getConfirmation(
            this.submitConfirmationDetails, // modal configurations
            () => this.handleSubmit(), // callback function when user 'confirm' clicks confirm
            // optional: () => this.handleCancel()
        );
        */
    }
    handleSubmit() {
        //event.preventDefault();
        console.log('handle submit button clicked')
        this.retrieveAnswer();
       
        console.log(this.examId)
        console.log()
        submitExam({examId:this.examId, acctId:this.accId})
            .then((result) => {
                this.toastMessage = 'Exam submitted successfully.';
                this.toastTitle ='Success!';
                this.toastVariant='success';
                console.log(this.toastMessage);
                console.log(result);
                this.error = undefined;
                this.handleSubmitAnswers();
            })
            .catch((error) => {
                this.toastMessage = "Error occured submitting exam " + error.message;
                this.toastTitle ='Oops! Error occured';
                this.toastVariant='error';
                this.console.log(toastMessage);
                this.error = error;
                //this.contacts = undefined;
            }).finally(()=>{
                const toastEvent = new ShowToastEvent({
                    title: this.toastTitle,
                    message: this.toastMessage,
                    variant: this.toastVariant,
                    mode: 'dismissable'
                });
                this.dispatchEvent(toastEvent);
            });
            
    }
    
    handleSubmitAnswers() {
        
        submitAnswers({ examQuestionList: this.examQuestions ,examAnswerList:this.examAnswers })
        .then((result) => {
            console.log(result);
            this.error = undefined;
            console.log("success submitting answers!");
            this.submitButtonDisabled=true;
            const confirmationComponent = this.template.querySelector('c-lwc-slds-modal');
            confirmationComponent.showButtonDisabled=true;
            this.updateAnswers=false;
            if(this.confettiAvailable){
                this.showCelebrateButton=true;
                this.fireworks();
            }
        })
        .catch((error) => {
            this.toastMessage = "Error occured submitting exam " + error.message;
            this.toastTitle ='Oops! Error occured';
            this.toastVariant='error';
            console.log(this.toastMessage);
            this.error = error;
        //this.contacts = undefined;
        })
       
    }

    //added some fireworks for fun to celebrate end of program, adds confetti after successful submit
    // and a displays a button to play it again.  A little pizzazz
    /* 
     1. download js min file and save to disk from :
        https://cdn.jsdelivr.net/npm/canvas-confetti@1.4.0/dist/confetti.browser.min.js
    2. go to setup in org and search for static resources
    3. add new static resource with name "confetti"
    4. click upload file and select the confetti.browser.min.js file you saved in step one.
    5. click save

    */
    myconfetti;

    confettiAvailable=false;
    connectedCallback() {
      Promise.all([
        loadScript(this, CONFETTI )
      ])
        .then(() => {
            /*
          this.dispatchEvent(
            new ShowToastEvent({
              title: "Success",
              message: "Dependencies loaded successfully",
              variant: "Success"
            })
          );
          */
        this.confettiAvailable=true;
          this.setUpCanvas();
        })
        .catch(error => {
          this.dispatchEvent(
            new ShowToastEvent({
              title: "confetti unavailable",
              message: "upload Static confetti resource for confetti on submit!",
              variant: "info"
            })
            
          );
          this.confettiAvailable=false;
        });
    }
  
  
    setUpCanvas() {
      var confettiCanvas = this.template.querySelector("canvas.confettiCanvas");
      this.myconfetti = confetti.create(confettiCanvas, { resize: true });
      this.myconfetti({
        zIndex: 10000
      });
    }
    fireworks() {
        var end = Date.now() + 8 * 1000;
    
    
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        let interval = setInterval(function() {
          if (Date.now() > end) {
            return clearInterval(interval);
          }
    
    
          // eslint-disable-next-line no-undef
          confetti({
            startVelocity: 30,
            spread: 360,
            ticks: 60,
            origin: {
              x: Math.random(),
              // since they fall down, start a bit higher than random
              y: Math.random() - 0.2
            }
          });
        }, 200);
      }
    }


    //Set Display values based on question type to conditionally render question type components
   
   
/*
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
                
                this.setEssayTextAreaWithTitanAnswerForQuestion();
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

    clearEssayTextArea(){
     
        const essayQuestionComponent = this.template.querySelector('c-lwc-essay-type-questions');
        if(essayQuestionComponent){
            essayQuestionComponent.handleTextAreaReset();
        }
       
    }
    */
    
  
   //Create map  mapping current answers to question number 
   //has to get the answer from child component we render for the question type
   // they use a sosl query to get the child component and then get its answer
   //need to create a new varible to hold the current component that is currently rendered
   //so we can call the answer function on the childcomponent to get the answer and map it to the map

 
//}

