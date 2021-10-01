/**
 * @description       : 
 * @author            : Rayshawn
 * @group             : 
 * @last modified on  : 10-01-2021
 * @last modified by  : Daniel Boice
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   09-30-2021   Rayshawn   Initial Version
**/
import {api, LightningElement } from 'lwc';

export default class LwcEssayTypeQuestions extends LightningElement {
    @api question;
   
    @api essayQuestion ='Question';
    @api essayAnswer ='No answer provided';

    @api
    handelTextAreaReset(){
      console.log("handle text area reset fired")
      const textarea = this.template.querySelector('lightning-textarea');
   
      if (textarea){
        console.log('textarea value setting to null');
        textarea.value= null;
      }
    }
    @api
    handelTextAreaSetTitanAnswer(answer){
      console.log("handle text area set answer fired")
      const textarea = this.template.querySelector('lightning-textarea');
   
      if (textarea){
        console.log('textarea value setting current answer given by titan in exam');
        textarea.value= answer;
      }
    }
    inputAnswer(event) {
      this.essayAnswer = event.target.value;
      event.preventDefault();
     
      // Creates the event with the essay answer data.
      const answerEvent = new CustomEvent('answerupdated', { detail: this.essayAnswer });

      // Dispatches the event.
      this.dispatchEvent(answerEvent);
    }
   

}