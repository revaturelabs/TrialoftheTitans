import { api, LightningElement } from 'lwc';

export default class EssayTypeQuestions extends LightningElement {
    @api question = {
        Question_Type__c: '',
        Missing_Word__c: '',
        NAME: '',
        Question_Text__c: '',
        Options__c: '',
        Correct_Answer_s__c: '',
        Answer_Explanation__c: '',
        Titan__c: ''
    };
   
    @api essayQuestion ='Question';
    @api essayAnswer ='No answer provided';

    
    inputAnswer(event) {
      this.essayAnswer = event.target.value;
    }

}