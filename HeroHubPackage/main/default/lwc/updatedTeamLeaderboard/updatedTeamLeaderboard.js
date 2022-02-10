//////////////////////////////////////////////////////////////////////
//
// Name: updatedTeamLeaderboard
// Author: Tobias Diaz, Raksha Jha
// Created: 1/20/22
// Last Updated: 1/25/22
// Description: The JavaScript for our updatedTeamLeaderboard component
// 
//////////////////////////////////////////////////////////////////////

import { LightningElement, wire, track } from "lwc";
import { publish, MessageContext, createMessageContext } from "lightning/messageService";
import NOTIFICATION from "@salesforce/messageChannel/notification__c";
import getWeeksWon from "@salesforce/apex/updatedTeamLeaderBoardHandler.getWeeksWon";

//Columns to display on our datatable.
//The fieldName corresponds to the name of the field (or sometimes alias) we're retrieving in our SOQL query.
const COLUMNS = [
    { label: "Team Name", fieldName: "Team", hideDefaultActions: true, type: "text" },
    { label: "Weeks won", fieldName: "Weeks_Won", hideDefaultActions: true, type: "Number" }
];

export default class UpdatedTeamLeaderboard extends LightningElement {
    @track teams;
    @track columns = COLUMNS;
    @track error;
    context = createMessageContext();

    @wire(getWeeksWon)
    wiredWeeksWon({ error, data }) {
        if (data) {
            this.teams = data;
            const message = {
                teamData: data
            };
            this.publishMessage(message);
        } else if (error) {
            this.error = error;
            this.teams = undefined;
        }
    }

    publishMessage(message) {
        console.log(message);
        publish(this.context, NOTIFICATION, message);
    }
}
