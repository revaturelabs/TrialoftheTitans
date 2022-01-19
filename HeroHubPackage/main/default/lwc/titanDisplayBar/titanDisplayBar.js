import { LightningElement, track, api } from "lwc";

import getCurrentUser from "@salesforce/apex/titanDisplayController.getCurrentUser";
import getUserExams from "@salesforce/apex/titanDisplayController.getUserExams";
import getNumberOfTitanExams from "@salesforce/apex/titanDisplayController.getNumberOfTitanExams";
export default class TitanDisplayBar extends LightningElement {
    @track disableOverview = false;
    @track disableAdvance = false;
    @api titanId;

    @track currentUser;



    connectedCallback() {
        let user = getCurrentUser();
        user.then(res => {
            this.currentUser = res;
            let userExams = getUserExams({ titanId: this.titanId, userId: this.currentUser.Id });
            userExams.then(res => {
                console.log('exams: ', res);
            })
        })

        let numExams = getNumberOfTitanExams({ titanId: this.titanId });
        numExams.then(res => {
            console.log('number of exams: ', res);
        })
    }

    handleOverview() {}

    handleAdvance() {}
}
