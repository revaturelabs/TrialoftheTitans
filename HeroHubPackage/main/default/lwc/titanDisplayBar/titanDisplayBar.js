import { LightningElement, track, api } from "lwc";

export default class TitanDisplayBar extends LightningElement {
    @track disableOverview = false;
    @track disableAdvance = false;
    @api name;

    connectedCallback() {}

    handleOverview() {}

    handleAdvance() {}
}
