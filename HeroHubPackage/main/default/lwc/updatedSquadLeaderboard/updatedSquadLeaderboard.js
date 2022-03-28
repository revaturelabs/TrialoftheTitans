//////////////////////////////////////////////////////////////////////
//
// Name: updatedSquadLeaderboard
// Author: Tobias Diaz, Raksha Jha
// Created: 1/20/22
// Last Updated: 1/25/22
// Description: The JavaScript for our updatedSquadLeaderboard component
// 
//////////////////////////////////////////////////////////////////////

import { LightningElement, wire, track } from "lwc";
import { publish, MessageContext, createMessageContext } from "lightning/messageService";
import NOTIFICATION from "@salesforce/messageChannel/notification__c";
import getUpdatedScore from "@salesforce/apex/updatedSquadLeaderBoardHandler.getUpdatedScore";

//Columns to display on our datatable.
//The fieldName corresponds to the name of the field (or sometimes alias) we're retrieving in our SOQL query.
const COLUMNS = [
    { label: "Hero Name", fieldName: "Name", hideDefaultActions: true, type: "text" },
    { label: "Hero Score", fieldName: "Weekly_Arete_Number__c", hideDefaultActions: true, type: "Number" }
];
export default class UpdatedSquadLeaderboard extends LightningElement {
    @track squadName;
    @track accounts;
    @track columns = COLUMNS;
    @track error;
    context = createMessageContext();

    @wire(getUpdatedScore)
    wiredupdatedScore({ error, data }) {
        if (data) {
            this.accounts = data;
            this.squadName = "Squad Leaderboard for: " + this.accounts[0].Squad__r.Name;
            const message = {
                squadData: data
            };
            this.publishMessage(message);
        } else if (error) {
            this.error = error;
        }
    }

    publishMessage(message) {
        publish(this.context, NOTIFICATION, message);
    }
}
