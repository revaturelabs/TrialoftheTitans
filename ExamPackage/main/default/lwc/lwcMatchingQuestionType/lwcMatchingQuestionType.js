import { api, LightningElement } from 'lwc';

export default class MultipleChoiceQuestionLWC extends LightningElement {

    //grab recordID
    @api recordId;

    //Variable declaration
    answerChoice;

    //These should be passed by the parent
    @api
    questionprompt = "can you come here";
    @api
    options; // use = [1,2,3] to test component in salesforce by itself
    @api answers; //use = [4,5,6] to test component in salesforce by itself
    //Called at startup to populate the values

    connectedCallback() {        
        if(!this.options){
            return null;
        }
        //this is to make sure the check group options is formatted correctly when displaying
        let opt = this.options;
        opt = opt.toString().split('||'); //use ',' to split if you used [1,2,3] above

        this.options= opt;
        //this is to make sure the check group options is formatted correctly when displaying

        
        if(!this.answers){
            return null;
        }
        
        var answers = this.answers;
        answers = answers.toString().split('||');  //use ',' to split if you used [4,5,6] above
        let answersArray = [];
        for (let i = 0; i< answers.length; i++) {
            let myanswers = {
                'label': `${answers[i]}`,
                'value': `${answers[i]}`
            };
            answersArray.push(myanswers);
        }
        this.answers= answersArray;
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