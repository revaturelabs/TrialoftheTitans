import {api, LightningElement } from 'lwc';

export default class LwcTrueFalseQuestion extends LightningElement {

    
    options = [
        {'label': 'True', 'value': 'option1'},
        {'label': 'False', 'value': 'option2'}
        ];

    @api
    questionprompt;

    value;

    changeValue(event){
        let tempAns = event.detail.value;        
        this.value = tempAns;
        return tempAns;
    }
 

    @api                   
    answer(){              
        return this.value; 
    }                     
}