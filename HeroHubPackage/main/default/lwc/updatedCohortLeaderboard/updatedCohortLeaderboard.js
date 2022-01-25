import { LightningElement, wire, track } from "lwc";
import { publish, MessageContext, createMessageContext } from "lightning/messageService";
import NOTIFICATION from "@salesforce/messageChannel/notification__c";
import getUpdatedCohortScore from "@salesforce/apex/updatedCohortLeaderboardHandler.getUpdatedCohortScore";

const COLUMNS = [
    { label: "Team Name", fieldName: "Name", hideDefaultActions: true, type: "text" },
    { label: "Average Score", fieldName: "Average_Score", hideDefaultActions: true, type: "Number" }
];

export default class UpdatedCohortLeaderboard extends LightningElement {
    @track cohorts;
    @track cohortName;
    @track columns = COLUMNS;
    @track error;
    context = createMessageContext();

    @wire(getUpdatedCohortScore)
    wiredupdatedScore({ error, data }) {
        if (data) {
            this.cohorts = data;
            console.log(data);
            this.cohortName = "Cohort Leaderboard for: " + this.cohorts[0].C;
            const message = {
                cohortData: data
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
