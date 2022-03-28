/**
 * @description       :
 * @author            : Daniel Boice
 * @group             :
 * @last modified on  : 10-05-2021
 * @last modified by  : Daniel Boice
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   10-01-2021   Daniel Boice   Initial Version
 **/

/*
if we had more time I would do it slightly differently, but it works for now.  with things scattered around and everybody working on other things, it was the best
way to do it for now I think to get it working, without making or updating the other components.  This was useful for testing the exam interview component without
having the other components available.

It would be easier have separate components for textarea(shortanswer and essay), number, checkbox group, radio, and combo box, and pass in the 
question to each of them and have them display conditionally based on question type in each component when the question updates, and send up an
event to the interview component with the correct answer format. That would make more sense. but we would have to update or make all those components, 
and not have much time to finish that right now. it was a good learning exercise and practice though.

for future updates, have each of the child components take in the question and set the question text, and display their template when the question updates
if the question type is correct. but there is no need for duplicate components for textarea (short answer and essay) and (truefalse and multiple choice) question
types that we were handed from the aura components.
*/

import { api, track, LightningElement } from "lwc";

export default class LwcQuestion extends LightningElement {
  @api
  question;

  @track
  answer;
  displayAnswerGiven = "No answer provided";
  //these display the components based on question type

  displayTextarea = false;
  displayRadioGroup = false;
  displayInput = false;
  displayCheckboxGroup = false;
  displayComboBox = false;
  optionsForComboBox = [];
  radioCheckboxGroupComboBoxOptions_ = [];
  answersForComboBox = [];
  comboBoxAnswersProvided = {
    choice1: "Test One",
    choice2: "Test two",
    choice3: "Test three"
  };
  /*get options() {  //Alex Bashaw, 10/25/21, commented due to it not being used anywhere
        return [
            { label: 'New', value: 'new' },
            { label: 'In Progress', value: 'inProgress' },
            { label: 'Finished', value: 'finished' },
        ];
    }*/
  value = "";
  @api
  handleSetAnswer(answer) {
    //to set the control to to the answer format or clear the field
    //  based on lightning-textarea, lightning-combobox
    //  lightning-input, lightning-radio-group or lightning-combobox
    // could be done in separate components if passed in when the question updates

    this.setDisplayQuestionTypeBoolValues();
    if (typeof this.question !== "undefined" && this.question) {
      if (
        this.question.Options__c &&
        !(this.displayTextarea || this.displayInput)
      ) {
        if (this.displayComboBox && this.question.Correct_Answer_s__c) {
          //this.answersForComboBox=this.createOptionsArrayFromString(this.question.Correct_Answer_s__c);
          this.answersForComboBox = this.createOptionsArrayFromString(
            this.question.Correct_Answer_s__c
          );
          this.answersForComboBox.push({
            label: "not matched",
            value: "not matched"
          });

          this.comboBoxAnswersProvided = {};

          var test = this.question.Options__c.split("||");
          // console.log(test);
          this.optionsForCombobox = test;

          for (let i = 0; i < test.length; i++) {
            // console.log(test[i]);

            this.comboBoxAnswersProvided[test[i]] = "not matched";
          }
          /* this.question.Options__c.split('||').forEach(opt =>{ // Alex Bashaw, 10/25/21, commented due to being redundant with the preceeding loop
                        console.log(opt);
                        this.comboBoxAnswersProvided[opt]='not matched';
                    }); */

          if (typeof answer === "string" && answer.length) {
            var answerOptionList = answer.toString().split("||");
            for (let i = 0; i < answerOptionList.length; i++) {
              let objKeysComboBoxOptions = Object.keys(
                this.comboBoxAnswersProvided
              );
              if (i < objKeysComboBoxOptions.length) {
                // console.log("val is "+this.comboBoxAnswersProvided[objKeysComboBoxOptions[i]]);
                // console.log('answer list value is ');
                // console.log(answerOptionList[i]);
                this.comboBoxAnswersProvided[objKeysComboBoxOptions[i]] =
                  answerOptionList[i];

                // console.log('answeroptionlist is '+ answerOptionList[i]);
                // console.log(objKeysComboBoxOptions[i]);
                // const comboOptionComponent = this.shadowRoot.querySelector(`lightning-combobox[name="${objKeysComboBoxOptions[i]}"]`);

                //having difficulty updating the combo boxes when returning to them. but answers are saved and loaded. Just the selection lists are not showing selected.
                // console.log("checking");
                this.template
                  .querySelectorAll("lightning-combobox")
                  .forEach((ele) => {
                    if (ele.name == objKeysComboBoxOptions[i]) {
                      // console.log("conboboxoption component found");
                      // console.log("setting to " + answerOptionList[i]);
                      comboOptionComponent.value = answerOptionList[i];
                    }
                  });
                // if(comboOptionComponent ){

                // }
                // else{
                //     console.log(`lightning-combobox[data-name="${objKeysComboBoxOptions[i]}"]`)
                //     console.log('did not find the component')
                // }
              }
            }
          }
        } else {
          this.radioCheckboxGroupComboBoxOptions =
            this.createOptionsArrayFromString(this.question.Options__c);
          var answerList = answer.toString().split("||");
          var answerString = "";
          answerList.forEach((answerList) => {
            answerString += answerList + ";";
          });
          answerString = answerString.length ? answerString.slice(0, -1) : "";
          this.answer = answerString;
        }
      } else {
        //it is a textarea, number
        this.answer = answer;
      }
    }
    this.displayAnswerGiven = answer;
  }

  // takes string and formats for displaying in control
  createOptionsArrayFromString(optionsString) {
    if (optionsString.length) {
      var options = optionsString.split("||");
      var optionsArray = [];
      for (let i = 0; i < options.length; i++) {
        let myObject = {
          label: `${options[i]}`,
          value: `${options[i]}`
        };
        optionsArray.push(myObject);
      }
      // console.log("optionsArray in create");
      // console.log(optionsArray);
      return optionsArray;
    }
  }
  //made these getters and setters during testing to insert console logs when setting the options, but they could be just properties.  useful for debugging.
  get radioCheckboxGroupComboBoxOptions() {
    return this.radioCheckboxGroupComboBoxOptions_;
  }
  set radioCheckboxGroupComboBoxOptions(myoptions) {
    this.radioCheckboxGroupComboBoxOptions_ = myoptions;
  }
  // get optionsForCombobox(){
  //     return this.optionsForComboBox_;
  // }
  // set optionsForCombobox(myoptions){
  //     this.optionsForComboBox_= myoptions;
  // }
  // get answersForComboBox(){
  //    return this.answersForComboBox_;
  // }
  // set answersForComboBox(myanswers){
  //     this.answersForComboBox=myanswers;
  // }

  //sends up the answer in the correct format based on question type
  handleInputAnswer(event) {
    let typeOfValue = typeof event.target.value;
    var stringToSend = "";
    // console.log(typeOfValue);

    if (typeOfValue === "object") {
      // console.log(event.target.value);

      let obj = event.target.value;
      let objLength = Object.keys(obj).length;
      for (let i = 0; i < objLength; i++) {
        stringToSend += obj[i] + "||";
      }
      stringToSend = stringToSend.slice(0, -2);
    } else if (typeOfValue === "string") {
      if (this.displayComboBox) {
        //formatting the combo box string to store for matching
        this.comboBoxAnswersProvided[event.target.name] = event.target.value;
        // console.log(this.comboBoxAnswersProvided);
        var createAnswerString = "";

        for (
          let i = 0;
          i < Object.keys(this.comboBoxAnswersProvided).length;
          i++
        ) {
          createAnswerString +=
            this.comboBoxAnswersProvided[
              Object.keys(this.comboBoxAnswersProvided)[i]
            ] + "||";
        }
        // Object.keys(this.comboBoxAnswersProvided).forEach(val =>{

        // });
        createAnswerString =
          createAnswerString.length > 1
            ? createAnswerString.slice(0, -2)
            : createAnswerString;
        // console.log(createAnswerString);
        stringToSend = createAnswerString;
      } else {
        stringToSend = event.target.value ? event.target.value : "";
      }
    }

    //event.preventDefault();
    this.displayAnswerGiven = stringToSend;
    // Creates the event with the answer data.
    const answerEvent = new CustomEvent("answerupdated", {
      detail: stringToSend
    });
    // Dispatches the event.
    this.dispatchEvent(answerEvent);
  }

  //switches on or off displaying the type fields when question updates based on question type
  setDisplayQuestionTypeBoolValues() {
    if (typeof this.question != "undefined") {
      switch (this.question.Question_Type__c) {
        //matching needs to be done
        case "Matching":
          this.displayComboBox = true;
          this.displayRadioGroup = false;
          this.displayCheckboxGroup = false;
          this.displayTextarea = false;
          this.displayInput = false;
          break;
        case "Numerical":
          this.displayComboBox = false;
          this.displayRadioGroup = false;
          this.displayCheckboxGroup = false;
          this.displayTextarea = false;
          this.displayInput = true;
          break;
        case "Essay":
        case "Short answer":
          this.displayComboBox = false;
          this.displayRadioGroup = false;
          this.displayCheckboxGroup = false;
          this.displayTextarea = true;
          this.displayInput = false;
          break;
        case "Multiple Choice - multiple answers":
          this.displayComboBox = false;
          this.displayRadioGroup = false;
          this.displayCheckboxGroup = true;
          this.displayTextarea = false;
          this.displayInput = false;
          break;
        case "True-false":
        case "Multiple Choice":
          this.displayComboBox = false;
          this.displayRadioGroup = true;
          this.displayCheckboxGroup = false;
          this.displayTextarea = false;
          this.displayInput = false;
          break;
        default:
          break;
      }
    }
  }
}