import { LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class LwcQCQuestionCreate extends LightningElement {
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
    //for future implementation, can add way of refreshing view so that the form is how it was when first rendered
  }
}
