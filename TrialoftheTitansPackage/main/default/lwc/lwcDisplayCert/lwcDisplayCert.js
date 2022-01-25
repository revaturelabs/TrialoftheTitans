import { LightningElement, wire, api, track } from "lwc";
import Id from "@salesforce/user/Id";

/* 
    Author: Julia Weakley
    Date Last Modified: 10/25/2021
    Description:  
        Method that grabs the data needed for the component
*/
import Certifications from "@salesforce/apex/getCertifications.Certifications";

export default class DisplayCert extends LightningElement {
  //method that grabs existing certifications for user
  @wire(Certifications) certs;
}