/*
 * @description       : Creates questions and allows users to submit to the server
 * @author            : Austin Ulberg, Daniel Boice, Zain Hamid, Conner Eilenfeldt
 * @group             :
 * @last modified on  : 02-18-2022
 * @last modified by  : Conner Eilenfeldt
 * Modifications Log
 * Ver   Date         Author                Modification
 * 1.0   09-30-2021   Daniel Boice          Initial Version
 * 1.1   02-11-2022   Zain Hamid            Question randomization
 * 1.2   02-14-2022   Zain Hamid            Question state tracking
 * 1.3   02-15-2022   Conner Eilenfeldt     Submission confirmation message
 * 1.4   02-17-2022   Conner Eilenfeldt     Exam details header
 * 1.5   02-18-2022   Conner Eilenfeldt     Added exam timer
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
  // exam details
  examName;
  titan;
  examTimeLimit;

  //for displaying errors
  error;

  //hard coded an exam id and account id for testing, set by parent component
  @api
  examId = "a0A8c00000fDw9GEAS";
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

  //holds the list of user's answers
  examAnswers = {};
  
  // User-entered answer on the current question
  answer = "";

  //disabling buttons
  nextButtonDisabled = false;
  prevButtonDisabled = true;

  //show celebrate button after submitting exam
  showCelebrateButton = false;
  submitButtonDisabled = false;

  //Index for questions
  @track
  questionNumber = 1;

  @api
  numberOfQuestions = 0;

  // toast event variables
  toastMessage = "";
  toastTitle = "";
  toastVariant = "";

  // confirmation message variables for submission
  submitConfirmationMessage;
  countMarked;
  countUnanswered;

  // question title
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

  //retrieve the exam from the database and set variables
  @wire(examFinder, { examID: "$examId" })
  wiredExamQuestions({ error, data }) {
    /*
      data is a List<List<SObject>>
      index 0 is a list of the exam questions
      index 1 is the exam details
        exam name, titan name, default timer
    */
    if (data) {
      console.log("Logging data");
      console.log(data);

      // data's exam questions
      this.numberOfQuestions = Object.keys(data[0]).length;
      this.examQuestions = this.shuffleQuestions(data[0]);

      // data's exam details
      this.examName = data[1][0].Name;
      this.titan = data[1][0].Titans__r[0].Name;
      this.examTimeLimit = data[1][0].Default_Time_Limit__c;

      this.error = undefined;
      //this.questionI=data[0];

      this.createBlankExamAnswersList();
      this.initializeQuestionsState();
      this.updateQuestionComponent();
    } else if (error) {
      this.error = error;
      this.examQuestions = undefined;
      this.examName = undefined;
      this.titan = undefined;
      this.examTimeLimit = undefined;
      console.log(error);
    }
  }

  //updating the child component when go to next or previous question
  updateQuestionComponent() {
    const questionComponent = this.template.querySelector("c-lwc-question");
    const flagComponent = this.template.querySelector("c-lwc-question-flag");
    const stateComponent = this.template.querySelector("c-lwc-exam-overview");
    stateComponent.questionstates = this.examQuestionsState;
    if (questionComponent && this.questionNumber < this.numberOfQuestions + 1) {
      this.currentQuestion = this.examQuestions[this.questionNumber - 1];
      questionComponent.question = this.currentQuestion;
      flagComponent.recordId = this.currentQuestion.Id;
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

  //so that they have the same number when submitting answers
  createBlankExamAnswersList() {
    for (let i = 0; i < this.numberOfQuestions; i++) {
      this.examAnswers[`${i + 1}`] = "";
    }
  }

  initializeQuestionsState() {
    let examQuestionPossibleState;
    for (let k = 1; k <= this.numberOfQuestions; k++) {
      examQuestionPossibleState = { questionNumber: k, answered: false, markedForReview: false, flagged: false };
      this.examQuestionsState.push(examQuestionPossibleState);
    }
  }

  shuffleQuestions(questionData) {
    let shuffled = Array(this.numberOfQuestions);
    let order = this.shuffleQuestionOrder(this.numberOfQuestions);
    console.log('Random question order');
    console.log(order);
    for(let k = 0; k < this.numberOfQuestions; k++) {
      shuffled[k] = questionData[order[k]];
    }
    return shuffled;
  }

  // Implementation of a bag randomizer
  // Since we can't sort/shuffle in-place on an actually used array, this instead returns the question order
  // in the style of a bag randomizer, which shuffleQuestions uses to shuffle instead
  shuffleQuestionOrder(totalNumberOfQuestions) {
    // Fisher-Yates algorithm
    let questionOrder = Array.from({ length: totalNumberOfQuestions }, (_, j) => j);
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
    // The actual state tracker component handles hybrid states (answered and marked for review) and displaying them correctly
    if (this.examAnswers[`${this.questionNumber}`]) {
      this.examQuestionsState[this.questionNumber - 1].answered = true;
    } else {
      this.examQuestionsState[this.questionNumber - 1].answered = false;
    }
    // Needs logic to handle only partial answers too
  }

  flagCurrentQuestion() {
    // called when receiving an event from the flag question button
    this.examQuestionsState[this.questionNumber - 1].flagged = true;
  }

  markForReviewCurrentQuestion() {
    // called when receiving an event from the mark for review button
    this.examQuestionsState[this.questionNumber - 1].markedForReview = !this.examQuestionsState[this.questionNumber - 1].markedForReview;
  }

  answerUpdated(event) {
    if (this.updateAnswers) {
      this.answer = event.detail;
    }
  }

  setExamAnswerToAnswerProvided() {
    this.examAnswers[`${this.questionNumber}`] = this.answer;
    this.setCurrentQuestionAnsweredState();
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
    if (this.questionNumber > 1) {
      this.gotoQuestionNumber(this.questionNumber - 1);
    }
  }

  nextClicked() {
    if (this.questionNumber < this.numberOfQuestions) {
      this.gotoQuestionNumber(this.questionNumber + 1);
    }
  }

  gotoQuestion(event) {
    this.gotoQuestionNumber(parseInt(event.detail, 10));
  }

  gotoQuestionNumber(qNumber) {
    this.setExamAnswerToAnswerProvided();
    this.questionNumber = qNumber;
    this.setCurrentAnswerToPreviouslyAnswered();
    this.updateQuestionComponent();
    this.setPrevNextDisabled();
  }

  // used to make noun plural if count is more than 1
  pluralize(count, noun, suffix = "s") {
    return `${noun}${count !== 1 ? suffix : ""}`;
  }

  // when submit button is clicked
  handleSubmit() {
    this.setExamAnswerToAnswerProvided();

    this.submitConfirmationMessage = "Are you sure you are ready to submit your exam to the titan?"
    this.countMarked = 0;
    this.countUnanswered = 0;

    for (let i = 0; i < this.numberOfQuestions; i++) {
      if (this.examQuestionsState[i].markedForReview == true)
        this.countMarked++;
      if (this.examQuestionsState[i].answered == false)
        this.countUnanswered++;
    }

    if (this.countMarked && this.countUnanswered) {
      this.submitConfirmationMessage += ` You have ${this.countMarked} ${this.pluralize(this.countMarked, "question")} still marked for review` +
        ` and ${this.countUnanswered} unanswered ${this.pluralize(this.countUnanswered, "question")}.`;
    }
    else if (this.countMarked) {
      this.submitConfirmationMessage += ` You have ${this.countMarked} ${this.pluralize(this.countMarked, "question")} still marked for review.`;
    }
    else if (this.countUnanswered) {
      this.submitConfirmationMessage += ` You have ${this.countUnanswered} unanswered ${this.pluralize(this.countUnanswered, "question")}.`;
    }
  }

  // when the confirmation button is clicked in submission modal
  // submit exam to apex controller
  handleConfirmSubmit() {
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
        this.confettiAvailable = true;
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