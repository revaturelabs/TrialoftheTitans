/*
    Author: Matthew Kim
    Description: LWC component that creates a new education
    Date Created: 10/17/21
    Date Edited: 10/18/21
*/

import { LightningElement, api } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import NAME_FIELD from "@salesforce/schema/Education__c.Name";
import DEGREE_FIELD from "@salesforce/schema/Education__c.Degree__c";
import MAJOR_FIELD from "@salesforce/schema/Education__c.Major__c";
import GPA_FIELD from "@salesforce/schema/Education__c.Gpa__c";
import DATEGRADUATE_FIELD from "@salesforce/schema/Education__c.DateGraduate__c";
import IMAGEURL_FIELD from "@salesforce/schema/Education__c.Image_URL__c";

export default class LwcCreateEducation extends LightningElement {
  recordId;

  // Expose a field to make it available in the template
  fields = [
    NAME_FIELD,
    DEGREE_FIELD,
    MAJOR_FIELD,
    GPA_FIELD,
    DATEGRADUATE_FIELD,
    IMAGEURL_FIELD
  ];

  handleSuccess() {
    //Show toast that record has been created
    const evt = new ShowToastEvent({
      title: "Successful Creation",
      message: "New Education was created!",
      variant: "success"
    });
    this.dispatchEvent(evt);
  }
}
