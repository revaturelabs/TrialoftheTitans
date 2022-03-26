import { LightningElement, track, api, wire } from "lwc";
import getTitanById from "@salesforce/apex/titanDisplayController.getTitanById";
import getCurrentUser from "@salesforce/apex/titanDisplayController.getCurrentUser";
import getNumberOfTitanExams from "@salesforce/apex/titanDisplayController.getNumberOfTitanExams";
import getUserExams from "@salesforce/apex/titanDisplayController.getUserExams";
import { NavigationMixin } from 'lightning/navigation';
import getTitanExamId from '@salesforce/apex/titanDisplayController.getTitanExamId';
import titanSelected from '@salesforce/messageChannel/TrialOfTheTitansXIChannel__c';
import {
    MessageContext,
    publish
} from 'lightning/messageService';

//d3 imports
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { loadScript } from "lightning/platformResourceLoader";
import D3 from "@salesforce/resourceUrl/DJS3";
import SystemModstamp from "@salesforce/schema/Account.SystemModstamp";

export default class TitanDisplayBar extends NavigationMixin(LightningElement) {

    @wire(MessageContext)
    messageContext;

    @track disableOverview = false;
    @track disableAdvance = false;
    @api titanId;
    @track currentUser;
    @track passedExams;
    @track totalExams;
    userExamsLoaded = false;

    @api id;
    @track titanName;

    renderedCallback() {

        let slicedId = this.id.slice(0, 18);
        let titan = getTitanById({ identifier: slicedId });
        titan.then((res) => {
            this.titanName = res[0].Name;
        });

        let user = getCurrentUser();
        user.then((res) => {
            this.currentUser = res;

            let userExams = getUserExams({ titanId: slicedId, userId: this.currentUser.Id });
            userExams.then((res) => {
                    if (Object.keys(res).length != null) {
                        this.passedExams = Object.keys(res).length;
                    } else {
                        this.passedExams = 0;
                    }
                    this.userExamsLoaded = true;
                })
                .catch((error) => {
                    console.log('error:', error);
                    this.passedExams = 0;
                    this.userExamsLoaded = true;
                });
        });

        let numExams = getNumberOfTitanExams({ titanId: slicedId });
        numExams.then((res) => {
            this.totalExams = res;
        });
    }

    // Handle Titan Overview button click
    // Get Titan Id for LMS and navigate to Titan Hub page
    titanExamId;
    error;
    handleOverview() {

        this.disableOverview = true;

        //Get Titan Id from Apex controller
        getTitanExamId({ titanName: this.titanName })
            .then((result) => {
                this.titanExamId = result;
                this.error = undefined;
                console.log(this.titanExamId + ' ' + this.titanName);
            })
            .catch((error) => {
                this.error = error;
                this.titanExamId = undefined;
            });

        // Publish Titan Id
        const payload = { titanExamId: this.titanExamId };
        publish(this.messageContext, titanSelected, payload);

        // Navigate to Titan Hub page
        this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                attributes: {
                    url: document.URL + 'titan-hub'
                }
            },
            true
        );
    }

    handleAdvance() {

    }
}