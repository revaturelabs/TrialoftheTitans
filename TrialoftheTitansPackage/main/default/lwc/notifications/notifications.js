import { LightningElement, wire } from 'lwc';
import notificationIcon from '@salesforce/resourceUrl/notificationBell_small';

import { subscribe, MessageContext, APPLICATION_SCOPE } from 'lightning/messageService';
import DATALMS from '@salesforce/messageChannel/notification__c';

export default class Notifications extends LightningElement {
    notification = notificationIcon;
    showDropdown = false;


    @wire(MessageContext) 
    messageContext;

    clickHandler(event){
        event.preventDefault();
        this.showDropdown = !this.showDropdown;
    }


    connectedCallback() {
        subscribe(
            this.messageContext,
            DATALMS,
            (message) => { this.handleData(message) }, {scope: APPLICATION_SCOPE}
        );
    }

    handleData(message){
        console.log(message);
    }
}