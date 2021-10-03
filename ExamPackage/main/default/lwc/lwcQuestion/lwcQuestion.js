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
    options = [
        { label: 'Ross', value: 'option1' },
        { label: 'Rachel', value: 'option2' },
      ];
      value = '';
    @api
    handleSetAnswer(answer){
      //to set the control to to the answer or clear the field
      // answerSelectorType should be a string either lightning-textarea
      //  lightning-input, lightning-radio-group or lightning-checkboxGroup
        console.log("handle text area set answer fired")
        this.setDisplayQuestionTypeBoolValues();
        console.log("bool values completed");
        // console.log(this.displayInput);

        // let answerSelectorType ='';
        // switch(true){
            
        //     case this.displayRadioGroup:
        //         answerSelectorType="lightning-radio-group" ;
        //         break;
        //     case  this.displayCheckboxGroup:
        //         answerSelectorType="lightning-checkbox-group" ;
        //         break;
        //     case this.displayTextarea:
        //         answerSelectorType="lightning-textarea" ;
        //         break;
        //     case this.displayInput:
        //         answerSelectorType="lightning-input" ;
        //         break;
        //     case this.displayComboBox:
        //         answerSelectorType="lightning-combobox" ;
        //        break;
        // }
        
    //     const textarea = this.template.querySelector('lightning-textarea[name="answertextarea"]');
        
    //   if (textarea){
    //     console.log('textarea value setting current answer given by titan in exam');
    //     textarea.value= answer;
    //   }

        // console.log(answerSelectorType);
      
        console.log('checking hello');
        
        console.log(typeof this.question);
        console.log(this.question);
      if ( typeof this.question!=='undefined' && this.question){
        console.log('setting current answer given by titan in exam');
        console.log(answer);
        if( this.question.Options__c && !(this.displayTextarea||this.displayInput)){
            console.log(this.createOptionsArrayFromString(this.question.Options__c))
            console.log("testing");
            if(this.displayComboBox&&this.question.Correct_Answer_s__c){
               this.answersForComboBox=this.createOptionsArrayFromString(this.question.Correct_Answer_s__c);
               this.optionsForCombobox=this.question.Options__c.toString().split('||');
               this.answer=answer.toString().split('||');
            }
            else{
                this.radioCheckboxGroupComboBoxOptions= this.createOptionsArrayFromString(this.question.Options__c);
                var answerList =answer.toString().split('||');
                var answerString = "";
                console.log(answer);
                console.log(answerList);
                answerList.forEach(answerList => {
			        console.log(answerList);
                    answerString += answerList + ";";
		        });
                answerString=answerString.length?answerString.slice(0,-1):'';
                console.log(answerString);
                console.log("setting answer in r")
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
        console.log("createOptionsArrayFromString fired");
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
            console.log("setting options create array");
            console.log(optionsArray);
           return optionsArray;
        }
    }
    get radioCheckboxGroupComboBoxOptions(){
        console.log("gettin gradioCheckboxGroupComboBoxOptions");
        return this.radioCheckboxGroupComboBoxOptions_; 
    }
    set radioCheckboxGroupComboBoxOptions(myoptions){
        console.log('setting options for combo b')
        this.radioCheckboxGroupComboBoxOptions_ = myoptions;
    }
    get optionsForCombobox(){
        console.log("getting options for combobox");
        return this.optionsForComboBox_;
    }
    set optionsForCombobox(myoptions){
        console.log('setting options for combo b')
        this.optionsForComboBox_= myoptions;
    }
    get answersForComboBox(){
        console.log("getting answersForComboBox");
       return this.answersForComboBox_;
    }
    set answersForComboBox(myanswers){
        console.log("getting answersForComboBox");
        this.optionsForComboBox_=myanswers;

    }
   

    handleInputAnswer(event) {
      console.log('input answer fired in essaytype component');
      console.log(event.target.value);
      console.log(typeof event.target.value);
      let typeOfValue = typeof event.target.value;
      var stringToSend='';
      if(typeOfValue==="object"){
          let obj=event.target.value;
          let objLength=Object.keys(obj).length;
            for(let i = 0; i< objLength; i++){
                stringToSend +=  obj[i] + "||";
            }
            stringToSend=stringToSend.slice(0,-2);
            console.log("sending string");
            console.log(stringToSend);
      }else if(typeOfValue==='string'){
            stringToSend=event.target.value?event.target.value:'';
      }

      //event.preventDefault();
      this.displayAnswerGiven = event.target.value;
      // Creates the event with the essay answer data.
      const answerEvent = new CustomEvent('answerupdated', { detail: stringToSend });
      // Dispatches the event.
      this.dispatchEvent(answerEvent);
    }
    setDisplayQuestionTypeBoolValues(){
        console.log('set display bool values function fired');
        console.log(typeof question);
        if(typeof this.question !='undefined'){
            console.log("question defined");
            console.log(this.question.Question_Type__c)
            
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
                    console.log('numerical case');
                    if(!this.displayInput){
                        switch(true){
                            case this.displayRadioGroup:
                                this.displayRadioGroup = false;
                                break;
                            case  this.displayCheckboxGroup:
                                this.displayCheckboxGroup = false;
                                break;
                            case this.displayTextarea:
                                console.log("setting text area to false");
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
            console.log(this.displayTextarea);
            console.log(this.displayInput);
        }
            
    }


}