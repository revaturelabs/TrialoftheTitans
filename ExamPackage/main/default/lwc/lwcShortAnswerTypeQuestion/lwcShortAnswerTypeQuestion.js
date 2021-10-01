import { LightningElement, api } from 'lwc';

export default class LwcShortAnswerTypeQuestion extends LightningElement {
    @api 
    ShortQuestion;
    // returns answer to the examinterview component
    @api 
    answer(cmp){
        var answer = cmp.find("input").value;
        console.log(answer);
        return answer;
    }
}