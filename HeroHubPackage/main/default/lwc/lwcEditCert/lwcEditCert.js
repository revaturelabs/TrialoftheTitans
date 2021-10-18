import { LightningElement, wire, track, api } from 'lwc';
import Id from '@salesforce/user/Id';


import NAME from '@salesforce/schema/User.Name';
import {getRecord, getFieldValue} from 'lightning/uiRecordApi';
import Certifications from '@salesforce/apex/getCertifications.Certifications'
const fields =[NAME];

export default class LwcEditCert extends LightningElement 
{
    @api recordId; 
    userId = Id;
    @wire (getRecord, {recordId: '$userId', fields}) user; 
    

    @api edit= false; 
    @api certid; 
    @api certimage; 
   

    
 handleClick(event)
  {
     if(this.edit == true)
      {
         this.edit =false; 
      }
      else
      {
        this.edit = true; 
      } 
      console.log('Clicked ' );
  }

    
}