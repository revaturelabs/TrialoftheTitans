/**
 * @description       : 
 * @author            : Daniel Boice
 * @group             : 
 * @last modified on  : 09-30-2021
 * @last modified by  : Daniel Boice 
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   09-30-2021   Daniel Boice   Initial Version
**/
import { api, LightningElement } from 'lwc';

export default class MultipleChoiceQuestionLWC extends LightningElement {

    //Variable declaration
    answerChoice;

    //These should be passed by the parent
    @api
    questionprompt = '';
    @api
    radioGroupOptions;
    @api
    question
    //Called at startup to populate the values
    connectedCallback(){

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

    //Called when a choice is selected from the radio button group
    changeAnswer(event){

        let tempAns = event.detail.value;
        this.answerChoice = tempAns;
        return tempAns;

    }

    //Returns the answer to the parent
    @api
    answer(){
        return this.answerChoice;
    }

}