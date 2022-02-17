/*
 * @description       : Creates questions and allows users to submit to the server
 * @author            : Austin Ulberg, Daniel Boice
 * @group             :
 * @last modified on  : 10-03-2021
 * @last modified by  : Daniel Boice
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   09-30-2021   Daniel Boice   Initial Version
 * 1.1   02-11-2021   Zain Hamid     Question randomization
 * 1.2   02-14-2021   Zain Hamid     Question state tracking
 **/
import { LightningElement, api, wire, track } from "lwc";
//import exam from '@salesforce/schema/Exam__c';
//import titan from '@salesforce/schema/Titan__c';
//import Question from '@salesforce/schema/Exam_Question__c';
//import QuestionType from '@salesforce/schema/Exam_Question__c.Question_Type__c'
//import QuestionAnswer from '@salesforce/schema/Hero_Answer__c.Answer_Choice__c'
import examFinder from "@salesforce/apex/ExamInterviewApexController.examFinder";
import submitAnswers from "@salesforce/apex/ExamInterviewApexController.submitAnswers";
import submitExam from "@salesforce/apex/ExamInterviewApexController.submitExam";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { loadScript } from "lightning/platformResourceLoader";
import CONFETTI from "@salesforce/resourceUrl/confetti";

export default class LwcExamInterview extends LightningElement {
  //not implemented yet
  exam;
  titan;
  titanName;

  //for displaying errors
  error;

  //hard coded an exam id and account id for testing, set by parent component
  @api
  examId = "a0A8c00000eBc1YEAS";
  @api
  accId = "0018c000029Le1lAAC";

  //for switching off the update after exam is submitted
  updateAnswers = true;

  //holds the list of exam questions
  examQuestions;

  //holds the list of exam questions' states (indexed in the same order as above)
  @api
  examQuestionsState = [];

  // Have to include even though it's not used because of an old bug that never got fixed
  // https://ideas.salesforce.com/s/idea/a0B8W00000GdknvUAB/delete-non-packaged-api-variables-from-managed-lwc-components
  @api
  examQuestionOrder;

  //holds the list of exam answers
  examAnswers = {};

  //disabling buttons
  nextButtonDisabled = false;
  prevButtonDisabled = true;
  //show celebrate button after submitting exam
  showCelebrateButton = false;
  submitButtonDisabled = false;
  //Index for questions

  @track
  questionNumber = 1;

  question_;
  questionI;
  questionType;
  confirmation = "are you sure?";
  toastMessage = "";
  toastTitle = "";
  toastVariant = "";
  //questionNumberTitleText="Question " + (this.questionNumber + 1) +":";
  @api
  numberOfQuestions = 0;
  answer = "";
  //for the modal confirmation
  @track confirmation;

  get questionNumberTitleText() {
    if (this.numberOfQuestions) {
      return (
        "Question " +
        this.questionNumber +
        " (of " +
        this.numberOfQuestions +
        "):"
      );
    } else {
      return "Questions not loaded";
    }
  }

  /*
   Commented out by William Rembish on 10/25/2021
   Reason: not used for the actual component

  //useful for debugging
  get answer() {
    return this.answer_;
  }
  set answer(answerText) {
    this.answer_ = answerText;
  }
  */

  //so that they have the same number when submitting answers
  createBlankExamAnswersList() {
    for (let i = 0; i < this.numberOfQuestions; i++) {
      this.examAnswers[`${i + 1}`] = "";
    }
  }


  //retrieve the exam from the database and set variables
  @wire(examFinder, { examID: "$examId" })
  wiredExamQuestions({ error, data }) {
    if (data) {
      console.log("Logging data");
      console.log(data);
      this.numberOfQuestions = Object.keys(data).length;
      this.examQuestions = this.shuffleQuestions(data);
      this.error = undefined;
      this.createBlankExamAnswersList();
      this.initializeQuestionsState();
      //this.questionI=data[0];
      this.updateQuestionComponent();
    } else if (error) {
      this.error = error;
      this.examQuestions = undefined;
      console.log(error);
    }
  }
  /*
   Commented out by William Rembish on 10/25/2021
   Reason: not used for the actual component
   
  //useful for debugging
  set currentQuestion(question_) {
    this.question_ = question_;
  }
  get currentQuestion() {
    return this.question_;
  }
  */
  //updating the child component when go to next or previous question
  updateQuestionComponent() {
    const questionComponent = this.template.querySelector("c-lwc-question");
    const stateComponent = this.template.querySelector("c-exam-overview");
    stateComponent.questionstates = this.examQuestionsState;
    if (questionComponent && this.questionNumber < this.numberOfQuestions + 1) {
      this.currentQuestion = this.examQuestions[this.questionNumber - 1];
      questionComponent.question = this.currentQuestion;
      console.log('All questions');
      console.log(this.examQuestions);
      console.log('Printing current question');
      console.log(this.currentQuestion);
      console.log('Printing answer');
      console.log(this.examAnswers[`${this.questionNumber}`]);
      console.log('Printing question state');
      console.log(this.examQuestionsState);
      questionComponent.handleSetAnswer(this.examAnswers[`${this.questionNumber}`]);
    }
  }

  initializeQuestionsState() {
    let examQuestionPossibleState;
    for(let k = 1; k <= this.numberOfQuestions; k++) {
      examQuestionPossibleState = {questionNumber: k, answered: false, markedForReview: false, flagged: false};
      this.examQuestionsState.push(examQuestionPossibleState);
    }
  }

  shuffleQuestions(questionData) {
    let shuffled = Array(this.numberOfQuestions);
    let order = this.shuffleQuestionOrder(this.numberOfQuestions);
    console.log('Random question order');
    console.log(order);
    for(let k = 0; k < this.numberOfQuestions-1; k++) {
      shuffled[k] = questionData[order[k]];
    }
    return shuffled;
  }

  // Implementation of a bag randomizer
  // Since we can't sort/shuffle in-place on an actually used array, this instead returns the question order
  // in the style of a bag randomizer, which shuffleQuestions uses to shuffle instead
  shuffleQuestionOrder(totalNumberOfQuestions) {
    // Fisher-Yates algorithm
      let questionOrder = Array.from({length: totalNumberOfQuestions}, (_, j) => j);
      let m = totalNumberOfQuestions, t, i;
      while (m) {
        i = Math.floor(Math.random() * m--);
        t = questionOrder[m];
        questionOrder[m] = questionOrder[i];
        questionOrder[i] = t;
      }
      return questionOrder;
  }

  setCurrentQuestionAnsweredState() {
    console.log('Current question state');
    console.log(this.questionNumber);
    console.log(this.examAnswers[`${this.questionNumber}`]);
    if(this.examAnswers[`${this.questionNumber}`]) {
      this.examQuestionsState[this.questionNumber - 1].answered = true;
    } else {
      this.examQuestionsState[this.questionNumber - 1].answered = false;
    }
    // Needs logic to handle only partial answers too
  }

  /*
    flagCurrentQuestion() {
      // called when receiving an event from the flag question button
      this.updateCurrentQuestionState(flagged, true);
      
    }

    markForReviewCurrentQuestion() {
      // called when receiving an event from the mark for review button
      this.updateCurrentQuestionState(markedForReview, true);
    }
  */


  //this might be useful for setting the details of the modal popup component for confirmation when submitting the exam.  for future.  now they are in the modal component in the html, this could be developed further
  // submitConfirmationDetails = {
  //     text: 'Are you sure you want to submit your exam now?',
  //     confirmButtonLabel: 'Submit',
  //     confirmButtonVariant: 'neutral',
  //     cancelButtonLabel: 'Not Yet!',
  //     header: 'Confirm Submit'
  // };

  /*
   Commented out by William Rembish on 10/25/2021
   Reason: this isn't currently used anywhere

  handleModalButtonClick(event) {
    handleConfirmationButtonClick(event, this.confirmation);
  }
  */
  answerUpdated(event) {
    if (this.updateAnswers) {
      this.answer = event.detail;
    }
  }
  setExamAnswerToAnswerProvided() {
    this.examAnswers[`${this.questionNumber}`] = this.answer;
    console.log(this.examAnswers[`${this.questionNumber}`]);
  }

  setCurrentAnswerToPreviouslyAnswered() {
    this.answer = "";
    if (this.questionNumber < Object.keys(this.examAnswers).length + 1) {
      this.answer = this.examAnswers[`${this.questionNumber}`];
    }
  }
  setPrevNextDisabled() {
    this.prevButtonDisabled = this.questionNumber < 2;
    this.nextButtonDisabled = this.questionNumber + 1 > this.numberOfQuestions;
  }

  prevClicked() {
    this.setExamAnswerToAnswerProvided();
    this.setCurrentQuestionAnsweredState();
    if (this.questionNumber < this.numberOfQuestions) {
      this.questionNumber--;
    }
    this.setCurrentAnswerToPreviouslyAnswered();
    this.updateQuestionComponent();
    this.setPrevNextDisabled();
  }

  nextClicked() {
    this.setExamAnswerToAnswerProvided();
    this.setCurrentQuestionAnsweredState();
    if (this.questionNumber < this.numberOfQuestions) {
      this.questionNumber++;
    }
    this.setCurrentAnswerToPreviouslyAnswered();
    this.updateQuestionComponent();
    this.setPrevNextDisabled();
  }

  gotoQuestion(event) {
    this.setExamAnswerToAnswerProvided();
    this.setCurrentQuestionAnsweredState();
    this.questionNumber = parseInt(event.detail, 10);
    this.setCurrentAnswerToPreviouslyAnswered();
    this.updateQuestionComponent();
    this.setPrevNextDisabled();
  }


  //submit exam to apex controller
  handleSubmit() {
    this.setExamAnswerToAnswerProvided();
    submitExam({ examId: this.examId, acctId: this.accId })
      .then((result) => {
        this.toastMessage = "Exam submitted successfully.";
        this.toastTitle = "Success!";
        this.toastVariant = "success";
        console.log(this.toastMessage);
        console.log(result);
        this.error = undefined;
        this.handleSubmitAnswers();
      })
      .catch((error) => {
        this.toastMessage = "Error occured submitting exam " + error;
        this.toastTitle = "Oops! Error occured";
        this.toastVariant = "error";
        console.log(this.toastMessage);
        this.error = error;
      })
      .finally(() => {
        const toastEvent = new ShowToastEvent({
          title: this.toastTitle,
          message: this.toastMessage,
          variant: this.toastVariant,
          mode: "dismissable"
        });
        this.dispatchEvent(toastEvent);
      });
  }

  //submit exam answers to the apex controller.  not sure why they did it with two separate calls at the same time... but we are not trying to change the apex controllers too much now, could be combined later.
  handleSubmitAnswers() {
    submitAnswers({
      examQuestionList: this.examQuestions,
      examAnswerList: this.examAnswers,
      examId: this.examId
    })
      .then((result) => {
        this.error = undefined;
        this.submitButtonDisabled = true;
        const confirmationComponent =
          this.template.querySelector("c-lwc-slds-modal");
        confirmationComponent.showButtonDisabled = true;
        this.updateAnswers = false;
        if (this.confettiAvailable) {
          this.showCelebrateButton = true;
          this.fireworks();
        }
      })
      .catch((error) => {
        this.toastMessage = "Error occured submitting exam " + error.message;
        this.toastTitle = "Oops! Error occured";
        this.toastVariant = "error";
        console.log(this.toastMessage);
        console.error(error.message);
        console.error("e.name => " + error.name);
        console.error("e.message => " + error.message);
        console.error("e.stack => " + error.stack);
        this.error = error;
        //this.contacts = undefined;
      });
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

  confettiAvailable = false;
  connectedCallback() {
    Promise.all([loadScript(this, CONFETTI)])
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
        this.confettiAvailable = true;
        this.setUpCanvas();
      })
      .catch((error) => {
          console.log(error)
        this.dispatchEvent(
          new ShowToastEvent({
            title: "confetti unavailable",
            message: "upload Static confetti resource for confetti on submit!",
            variant: "info"
          })
        );
        this.confettiAvailable = false;
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
    let interval = setInterval(function () {
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
