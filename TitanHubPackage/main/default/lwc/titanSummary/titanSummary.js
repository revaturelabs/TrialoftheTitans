///////////////////////////////////////////////////////////////////////////////// 
// 
// Name: VideoTutorial
// Author: Christopher Brennan and Deep Patel
// Created: 01/20/2022
// Updated: 01/26/2022
// Description: It is a parent component of lectureNotes and Video Tutorial
// 
/////////////////////////////////////////////////////////////////////////////////

import projectOverview from '@salesforce/messageChannel/projectOverview__c';
import { subscribe, publish, MessageContext } from 'lightning/messageService';
import { LightningElement, api } from 'lwc';

export default class TitanSummary extends LightningElement {
    @api
    displayProject;
    connectedCallback() {
        this.subscription = subscribe(
            this.context, myChannel, (message) => this.handleMessage(message)
        );
    }

    handleMessage(message) {
        this.displayProject = true;
    }
}