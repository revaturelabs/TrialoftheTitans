import { api, LightningElement } from 'lwc';

export default class LwcMultiMultipleChoicesQuestion extends LightningElement {

    answerChoices;

    @api
    questionprompt ;
    @api
    checkGroupOptions;

    

    connectedCallback() {        
        if(!this.checkGroupOptions){
            return null;
        }
        var options = this.checkGroupOptions;
        console.log(options);
        options = options.split('||');
        console.log(options);
        let optionsArray = [];
        for (let i = 0; i< options.length; i++) {
            let myObject = {
                'label': `${options[i]}`,
                'value': `${options[i]}`
            };
            optionsArray.push(myObject);
        }
        console.log(optionsArray);
        this.checkGroupOptions= optionsArray;
	}
    
    changeAnswer(event){
        let tempAns = event.detail.value;
        let answerString = "";
        for(let i =0; i < tempAns.length-1; i++){
            answerString += tempAns[i]+"||";
        }
        answerString += tempAns[tempAns.length-1];
        this.answerChoices = answerString;
        return answerString;
    }

    @api
    answer(){
        return this.answerChoices;
    }
}