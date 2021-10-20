/*
/*
    Author: Liam Hunt
    Edited By: Julia Weakley
    Date Last Modified: 10/20/2021
    Description:  
        Js file to allow functionality for users to create/add certifications

*/

*/

import { LightningElement, api } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
export default class LwcCreateCertification extends LightningElement {

 @api create = false;

 handleCreate(event)
  {
    if (this.create == false)
    {
      this.create = true;
    }
    else
    {
      this.create = false; 
    }
    console.log(this.create);
  }

  


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
