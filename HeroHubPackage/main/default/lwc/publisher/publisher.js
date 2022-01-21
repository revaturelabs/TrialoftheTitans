import { LightningElement, wire } from 'lwc';
import { publish ,MessageContext } from 'lightning/messageService';
import DATALMS from "@salesforce/messageChannel/notification__c";
export default class Publisher extends LightningElement {
    leaderboardsData = {
        name : 'team 1',
        point : 490
    }

    @wire(MessageContext)
    messageContext;

    clickHandler(){
        console.log('button clicked');
        const messageSent = {
            data: this.leaderboardsData
        };
        publish(this.messageContext, DATALMS, messageSent);
        console.log('data from click handler'+ JSON.stringify(messageSent.data));
    }
}