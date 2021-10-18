import { LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
export default class LwcCreateCertification extends LightningElement {
  handleSuccess() {
    //Show that record has been added to the database
    const evt = new ShowToastEvent({
      title: "Successful Creation",
      message: "Question was successfully Created",
      variant: "success"
    });
    this.dispatchEvent(evt);

    // Set the recordId to null so a new question can be entered
    const editForm = this.template.querySelector("lightning-record-form");
    editForm.recordId = null;
  }
}
