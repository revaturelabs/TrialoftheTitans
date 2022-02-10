/////////////////////////////////////////////////////////////////////////////////
//
// Name: titanDisplayBar
// Author(s): Matthew Lewandowski, Andrew Emond, Todd Gooch
// Created: 01/13/2022
// Updated: 01/25/2022
// Description: A display bar for the titan view that displays info/ has buttons
//
/////////////////////////////////////////////////////////////////////////////////

import { LightningElement, track, api } from "lwc";
import getTitanById from "@salesforce/apex/titanDisplayController.getTitanById";
import getCurrentUser from "@salesforce/apex/titanDisplayController.getCurrentUser";
import getNumberOfTitanExams from "@salesforce/apex/titanDisplayController.getNumberOfTitanExams";
import getUserExams from "@salesforce/apex/titanDisplayController.getUserExams";

//d3 imports
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { loadScript } from "lightning/platformResourceLoader";
import D3 from "@salesforce/resourceUrl/DJS3";
export default class TitanDisplayBar extends LightningElement {
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
                if (Object.keys(res).length != null){
                    this.passedExams = Object.keys(res).length;
                }
                else{
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

    connectedCallback() {
        
    }
    handleOverview() {}

    handleAdvance() {}
}
