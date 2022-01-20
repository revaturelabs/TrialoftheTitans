import { LightningElement, track, api } from "lwc";
import getTitanById from "@salesforce/apex/titanDisplayController.getTitanById";

export default class TitanDisplayBar extends LightningElement {
    @track disableOverview = false;
    @track disableAdvance = false;
    @api id;
    @track titanName;

    renderedCallback() {
        let titan = getTitanById({ identifier: this.id.slice(0, -3) });
        titan.then((res) => {
            this.titanName = res[0].Name;
        });
    }

    handleOverview() {}

    handleAdvance() {}
}
