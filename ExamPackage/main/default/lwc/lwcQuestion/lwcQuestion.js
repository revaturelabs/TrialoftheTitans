/**
 * @description       : 
 * @author            : Daniel Boice
 * @group             : 
 * @last modified on  : 10-01-2021
 * @last modified by  : Daniel Boice
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   10-01-2021   Daniel Boice   Initial Version
**/
import { api, LightningElement } from 'lwc';

export default class LwcQuestion extends LightningElement {
    @api 
    question;
   
  
    @api
    titanAnswer  ='No answer provided';
    @api
    radioGroupOptions;
   
    //these display the components based on question type  

    displayTextarea=false;
    displayRadioGroup=false;
    displayInput=false;
    displayCheckboxGroup=false;
    //Called at startup to populate the values
    
    setMultipleChoiceQuestions(){

        if(!this.radioGroupOptions){
            return null;
        }
        let options = this.radioGroupOptions;
        options = options.split('||');
        let optionsArray = [];
        for (let i = 0; i< options.length; i++) {
            let myObject = {
                'label': `${options[i]}`,
                'value': `${options[i]}`
            };
            optionsArray.push(myObject)
        }
        this.radioGroupOptions = optionsArray;
    
    }

    @api
    handleTextAreaSetTitanAnswer(answer){
      console.log("handle text area set answer fired")
      const textarea = this.template.querySelector('lightning-textarea');
   
      if (textarea){
        console.log('textarea value setting current answer given by titan in exam');
        textarea.value= answer;
      }
      this.titanAnswer  = answer;
    }
   

    inputAnswer(event) {
     
      console.log('input answer fired in essaytype component');
      event.preventDefault();

     
      this.titanAnswer = event.target.value;
      // Creates the event with the essay answer data.
      const answerEvent = new CustomEvent('answerupdated', { detail: event.target.value });

      // Dispatches the event.
      this.dispatchEvent(answerEvent);
    }
   
    @api
    setDisplayQuestionTypeBoolValues(){
        console.log('set display bool values function fired');
        console.log(typeof question);
        if(typeof this.question !='undefined'){
            console.log("question defined");
            console.log(this.question.Question_Type__c)
            
            switch (this.question.Question_Type__c) {
                case "Matching":
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
                            
                        }
                         this.displayTextarea = true;
                    }
                    this.handleTextAreaSetTitanAnswer(); 
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
                            
                        }
                         this.displayTextarea = true;
                    }
                    this.handleTextAreaSetTitanAnswer();  
                case "Essay":
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
                            
                        }
                         this.displayTextarea = true;
                    }
                   
                   
                    this.handleTextAreaSetTitanAnswer();
                    break;
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
                        }
                         this.displayTextarea = true;
                    }
                    this.handleTextAreaSetTitanAnswer();
                    break;
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
                        }
                         this.displayRadioGroup = true;
                    }
                    this.setMultipleChoiceQuestions();
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
                        }
                         this.displayCheckboxGroup = true;
                    }
                    break;
                case "True-false":
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
                        }
                         this.displayRadioGroup = true;
                    }
                    this.setMultipleChoiceQuestions();
                default:
                    break;
            }
        }
            
    }


}