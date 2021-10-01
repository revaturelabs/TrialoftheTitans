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

    
    inputAnswer(event) {
      this.essayAnswer = event.target.value;
      event.preventDefault();
     
      // Creates the event with the essay answer data.
      const answerEvent = new CustomEvent('answerupdated', { detail: this.essayAnswer });

      // Dispatches the event.
      this.dispatchEvent(answerEvent);
    }

}