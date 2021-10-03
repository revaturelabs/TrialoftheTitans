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
      //to set the control to to the answer or clear the field
      // answerSelectorType should be a string either lightning-textarea
      //  lightning-input, lightning-radio-group or lightning-checkboxGroup
      
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