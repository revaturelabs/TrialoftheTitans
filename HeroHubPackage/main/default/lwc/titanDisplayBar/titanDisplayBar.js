import { LightningElement, track, api } from "lwc";

import getCurrentUser from "@salesforce/apex/titanDisplayController.getCurrentUser";
import getTitanById from "@salesforce/apex/titanDisplayController.getTitanById";
export default class TitanDisplayBar extends LightningElement {
    @track disableOverview = false;
    @track disableAdvance = false;
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
