///////////////////////////////////////////////////////////////////////////////// 
// 
// Name: VideoTutorial
// Author: Christopher Brennan and Deep Patel
// Description: Receives data from DATALMS message channel
// TODO: It needs to update into the html. 
/////////////////////////////////////////////////////////////////////////////////

import { LightningElement, wire } from "lwc";
import notificationIcon from "@salesforce/resourceUrl/notificationBell_small";

import { subscribe, MessageContext, APPLICATION_SCOPE } from "lightning/messageService";
import DATALMS from "@salesforce/messageChannel/notification__c";

export default class Notifications extends LightningElement {
    notification = notificationIcon;
    showDropdown = false;

    @wire(MessageContext)
    messageContext;
    // when click on notifaiton icon it will make false or true depending on current state
    clickHandler(event) {
        event.preventDefault();
        this.showDropdown = !this.showDropdown;
    }
    // subscribing from LMS
    connectedCallback() {
        subscribe(
            this.messageContext,
            DATALMS,
            (message) => {
                this.handleData(message);
            },
            { scope: APPLICATION_SCOPE }
        );
    }
    // console Log data that was subscribe from DATA LMS
    handleData(message) {
        console.log(message);
    }
}
