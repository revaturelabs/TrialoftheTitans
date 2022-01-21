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
        
    }

    connectedCallback() {
        let titan = getTitanById({ identifier: this.id.slice(0, 18) });
        console.log("Id: " + this.id);
        console.log('titan(spliced): ', this.id.slice(0, 18));
        titan.then((res) => {
            console.log("Name: " + res[0].Name);
            this.titanName = res[0].Name;
        });

        let slicedId = this.id.slice(0, -3);
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

        console;
        let numExams = getNumberOfTitanExams({ titanId: this.id.slice(0, -3) });
        numExams.then((res) => {
            this.totalExams = res;
        });
    }
    handleOverview() {}

    handleAdvance() {}
}
