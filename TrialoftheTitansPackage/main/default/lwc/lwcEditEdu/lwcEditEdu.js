/*
    
    Author: Liam Hunt
    Description: Js for education editing component
    Date Created: 10/20/21

*/

import { LightningElement, api } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class LwcEditEdu extends LightningElement {
  @api recordId;
  @api objectApiName;

  /*handleSuccess() {
        //Show toast that record has been updated
        const evt = new ShowToastEvent({
          title: "Successful Update",
          message: "Education was updated!",
          variant: "success"
        });
        this.dispatchEvent(evt);
      }*/
}
