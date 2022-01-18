import { LightningElement, track, api } from "lwc";

import getCurrentUser from "@salesforce/apex/titanDisplayController.getCurrentUser";
export default class TitanDisplayBar extends LightningElement {
    @track disableOverview = false;
    @track disableAdvance = false;
    @api name;
    @api titanId;



    connectedCallback() {
        let user = getCurrentUser();
        user.then(res => {
            console.log('Result: ' + res);
        })
    }

    handleOverview() {}

    handleAdvance() {}
}
