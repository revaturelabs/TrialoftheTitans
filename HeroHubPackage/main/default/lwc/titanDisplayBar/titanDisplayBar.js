import { LightningElement, track } from "lwc";
import getTitans from "@salesforce/apex/titanDisplayController.getTitans";
export default class TitanDisplayBar extends LightningElement {
  @track disableOverview = false;
  @track disableAdvance = false;
  @track titanList = [];

  connectedCallback() {
    let titans = getTitans();
    titans.then((res) => (this.titanList = res)).then(console.log(this.titanList));
  }

  handleOverview() {}

  handleAdvance() {}
}
