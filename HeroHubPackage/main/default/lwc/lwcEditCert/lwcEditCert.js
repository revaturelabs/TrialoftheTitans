/*
    Author: Julia Weakley
    Date Last Modified: 10/18/2021
    Description:  
        Js file to allow functionality for edit their certifications information

*/
import { LightningElement, wire, track, api } from 'lwc';
import Id from '@salesforce/user/Id';


import NAME from '@salesforce/schema/User.Name';


const fields =[NAME];

export default class LwcEditCert extends LightningElement 
{
   
    @api recordId; 
    // current user id
    userId = Id;
    // helps determine what record form should be shown 
    @api edit= false;
    // certification record id that was passed from the parent  
    @api certid; 
    @api certimage; 
 
   // event to handle button clicks 
 handleClick(event)
  {
     // if current value of edit is true change it to false 
     // else set edit to true
     if(this.edit == true)
      {
         this.edit =false; 
      } // end of if
      else
      {
        this.edit = true; 
      } // end of else
     
  } // end of button functionality   
}