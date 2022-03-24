/*
 * @description       : Question overview card to track status of questions and question redirects
 * @author            : Nathan Nassib
 * @group             :
 * @last modified on  : 02-15-2022
 * @last modified by  : Nathan Nassib
 * Modifications Log
 * Ver   Date         Author               Modification
 * 1.0   02-15-2022   Nathan Nassib        Initial Version
 **/

import { LightningElement, api, track } from 'lwc';

export default class LwcExamOverview extends LightningElement {

    @api questionstates = [];
    @track questionstatestracked = [];

    renderedCallback(){
        this.questionstatestracked = this.questionstates;
        console.log("This is question states tracked");
        console.log(this.questionstatestracked);
        console.log(this.questionstates);
    }

    connectedCallback(){

        console.log("This is questionstates tracked");
        console.log(this.questionstatestracked);
        console.log(this.questionstates);
    }

    jumpToQuestion(event) {
        this.dispatchEvent(new CustomEvent('questionchange', {detail: event.target.label}));
        console.log(event.target.label);
    }

}