/**
 * @description       : 
 * @author            : Daniel Boice
 * @group             : 
 * @last modified on  : 10-03-2021
 * @last modified by  : Daniel Boice
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   10-01-2021   Daniel Boice   Initial Version
**/

/*
if we had more time I would do it slightly differently, but it works for now.  with things scattered around and everybody working on other things, it was the best way to do it for now I think to get it working, without making or updating the other components.  This was useful for testing the exam interview component without having the other components available.

It would be easier have separate components for textarea(shortanswer and essay), number, checkbox group, radio, and combo box, and pass in the question to each of them and have them display conditionally based on question type in each component when the question updates, and send up an event to the interview component with the correct answer format. that would make more sense. but we would have to update or make all those components, and not have much time to finish that right now. it was a good learning exercise and practice though.

*/
import { api, track, LightningElement } from 'lwc';

export default class LwcQuestion extends LightningElement {
    @api 
    question;
    
    @track
    answer;
    displayAnswerGiven  ='No answer provided'
    //these display the components based on question type  

    displayTextarea=false;
    displayRadioGroup=false;
    displayInput=false;
    displayCheckboxGroup=false;
    displayComboBox=false;
    optionsForComboBox_ =[];
    radioCheckboxGroupComboBoxOptions_=[];
    answersForComboBox_=[];
    
      value = '';
    @api
    handleSetAnswer(answer){
      //to set the control to to the answer format or clear the field
      //  based on lightning-textarea, lightning-combobox
      //  lightning-input, lightning-radio-group or lightning-combobox
      // could be done in separate components if passed in when the question updates
      
        this.setDisplayQuestionTypeBoolValues();
        if ( typeof this.question!=='undefined' && this.question){
            if( this.question.Options__c && !(this.displayTextarea||this.displayInput)){
                if(this.displayComboBox&&this.question.Correct_Answer_s__c){
                this.answersForComboBox=this.createOptionsArrayFromString(this.question.Correct_Answer_s__c);
                this.optionsForCombobox=this.question.Options__c.toString().split('||');
                this.answer=answer.toString().split('||');
                }
                else{
                    this.radioCheckboxGroupComboBoxOptions= this.createOptionsArrayFromString(this.question.Options__c);
                    var answerList =answer.toString().split('||');
                    var answerString = "";
                    answerList.forEach(answerList => {
                        answerString += answerList + ";";
                    });
                    answerString=answerString.length?answerString.slice(0,-1):'';
                    this.answer=answerString;
                }
            }
            else{
                //it is a textarea, number
                this.answer = answer;
            }
        }
        this.displayAnswerGiven  = answer;
    }
    
    // takes string and formats for displaying in control 
    createOptionsArrayFromString(optionsString){
        if(optionsString.length){
           let options = optionsString.split('||');
            let optionsArray = [];
            for (let i = 0; i< options.length; i++) {
                let myObject = {
                    'label': `${options[i]}`,
                    'value': `${options[i]}`
                };
                optionsArray.push(myObject)
            }
           return optionsArray;
        }
    }
    //made these getters and setters during testing to insert console logs when setting the options, but they could be just properties.  useful for debugging.
    get radioCheckboxGroupComboBoxOptions(){
        return this.radioCheckboxGroupComboBoxOptions_; 
    }
    set radioCheckboxGroupComboBoxOptions(myoptions){
        this.radioCheckboxGroupComboBoxOptions_ = myoptions;
    }
    get optionsForCombobox(){
        return this.optionsForComboBox_;
    }
    set optionsForCombobox(myoptions){
        this.optionsForComboBox_= myoptions;
    }
    get answersForComboBox(){
       return this.answersForComboBox_;
    }
    set answersForComboBox(myanswers){
        this.optionsForComboBox_=myanswers;
    }

    //sends up the answer in the correct format based on question type
    handleInputAnswer(event) {
      let typeOfValue = typeof event.target.value;
      var stringToSend='';
      if(typeOfValue==="object"){
          let obj=event.target.value;
          let objLength=Object.keys(obj).length;
            for(let i = 0; i< objLength; i++){
                stringToSend +=  obj[i] + "||";
            }
            stringToSend=stringToSend.slice(0,-2);
      }else if(typeOfValue==='string'){
            stringToSend=event.target.value?event.target.value:'';
      }

      //event.preventDefault();
      this.displayAnswerGiven = event.target.value;
      // Creates the event with the answer data.
      const answerEvent = new CustomEvent('answerupdated', { detail: stringToSend });
      // Dispatches the event.
      this.dispatchEvent(answerEvent);
    }

    //switches on or off displaying the type fields when question updates based on question type
    setDisplayQuestionTypeBoolValues(){
        if(typeof this.question !='undefined'){
            switch (this.question.Question_Type__c) {
                //matching needs to be done
                case "Matching":
                    if(!this.displayComboBox){
                        switch(true){
                            case this.displayRadioGroup:
                                this.displayRadioGroup = false;
                                break;
                            case  this.displayCheckboxGroup:
                                this.displayCheckboxGroup = false;
                                break;
                            case this.displayTextarea:
                                this.displayTextarea = false;
                                break;
                            case this.displayInput:
                                this.displayInput=false;
                            
                        }
                         this.displayComboBox = true;
                    }
                    break;
                case "Numerical":
                    if(!this.displayInput){
                        switch(true){
                            case this.displayRadioGroup:
                                this.displayRadioGroup = false;
                                break;
                            case  this.displayCheckboxGroup:
                                this.displayCheckboxGroup = false;
                                break;
                            case this.displayTextarea:
                                this.displayTextarea = false;
                                break;
                            case this.displayComboBox:
                                this.displayComboBox = false;
                        }
                         this.displayInput = true;
                    }
                    break;
                case "Essay":
                case "Short answer":
                    if(!this.displayTextarea){
                        switch(true){
                            case this.displayRadioGroup:
                                this.displayRadioGroup = false;
                                break;
                            case  this.displayCheckboxGroup:
                                this.displayCheckboxGroup = false;
                                break;
                            case this.displayInput:
                                this.displayInput = false;
                                break;
                            case this.displayComboBox:
                                this.displayComboBox = false;
                        }
                         this.displayTextarea = true;
                    }
                    break;
                case "Multiple Choice - multiple answers":
                    if(!this.displayCheckboxGroup){
                        switch(true){
                            case this.displayTextarea:
                                this.displayTextarea = false;
                                break;
                            case  this.displayRadioGroup:
                                this.displayRadioGroup = false;
                                break;
                            case this.displayInput:
                                this.displayInput = false;
                                break;
                            case this.displayComboBox:
                                this.displayComboBox = false;
                        }
                         this.displayCheckboxGroup = true;
                    }
                    
                    break;
                case "True-false":
                case "Multiple Choice":
                    if(!this.displayRadioGroup){
                        switch(true){
                            case this.displayTextarea:
                                this.displayTextarea = false;
                                break;
                            case  this.displayCheckboxGroup:
                                this.displayCheckboxGroup = false;
                                break;
                            case this.displayInput:
                                this.displayInput = false;
                                break;
                            case this.displayComboBox:
                                this.displayComboBox = false;
                        }
                         this.displayRadioGroup = true;
                    }
                   break;
                default:
                    break;
            }
        }
            
    }


}