import { LightningElement, wire, track } from "lwc";
import { publish, MessageContext, createMessageContext } from "lightning/messageService";
import NOTIFICATION from "@salesforce/messageChannel/notification__c";
import getUpdatedScore from "@salesforce/apex/updatedSquadLeaderBoardHandler.getUpdatedScore";

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
            console.log(data);
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
