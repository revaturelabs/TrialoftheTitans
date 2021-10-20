import { LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
export default class LwcCreateCertification extends LightningElement {

 
  handleSuccess() {
   
    //Show that record has been added to the database
    const evt = new ShowToastEvent({
      title: "Successful Creation",
      message: "Certification was successfully added!",
      variant: "success"
    });

    

    this.dispatchEvent(evt);

    
    // Set the recordId to null so a new certification can be entered
        const editForm = this.template.querySelector("lightning-record-form");
        editForm.recordId = null;

       
 
  }
 
}
