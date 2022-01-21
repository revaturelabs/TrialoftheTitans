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

    @api id;
    @track titanName;

    renderedCallback() {
        let titan = getTitanById({ identifier: this.id.slice(0, -3) });
        titan.then((res) => {
            this.titanName = res[0].Name;
        });
    }

    connectedCallback() {
        let slicedId = this.id.slice(0, -3);
        let user = getCurrentUser();
        user.then((res) => {
            this.currentUser = res;
            let userExams = getUserExams({ titanId: slicedId, userId: this.currentUser.Id });
            userExams.then((res) => {
                this.passedExams = Object.keys(res).length;
                console.log("passed exams: ", this.passedExams);
            });
        });

        console;
        let numExams = getNumberOfTitanExams({ titanId: this.id.slice(0, -3) });
        numExams.then((res) => {
            this.totalExams = res;
            console.log(this.totalExams);
        });
    }
    handleOverview() {}

    handleAdvance() {}
}
