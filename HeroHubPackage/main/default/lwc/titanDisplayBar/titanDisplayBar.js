import { LightningElement, track, api } from "lwc";
<<<<<<< HEAD
import getCurrentUser from "@salesforce/apex/titanDisplayController.getCurrentUser";
import getUserExams from "@salesforce/apex/titanDisplayController.getUserExams";
import getNumberOfTitanExams from "@salesforce/apex/titanDisplayController.getNumberOfTitanExams";
=======
import getTitanById from "@salesforce/apex/titanDisplayController.getTitanById";
>>>>>>> a3d1114f232820f43364c420c3059a67f96b31d5

//d3 imports
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { loadScript } from 'lightning/platformResourceLoader';
import D3 from '@salesforce/resourceUrl/DJS3';
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
        let user = getCurrentUser();
        user.then(res => {
            this.currentUser = res;
            let userExams = getUserExams({ titanId: this.titanId, userId: this.currentUser.Id });
            userExams.then(res => {
                this.passedExams = Object.keys(res).length;
            })
        })

        let numExams = getNumberOfTitanExams({ titanId: this.titanId });
        numExams.then(res => {
            this.totalExams = res;
        })
    }
    handleOverview() {}

    handleAdvance() {}
}
