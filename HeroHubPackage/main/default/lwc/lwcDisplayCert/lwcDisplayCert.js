import { LightningElement, wire, api, track } from 'lwc';
import Id from '@salesforce/user/Id';


import NAME from '@salesforce/schema/User.Name';
import {getRecord, getFieldValue} from 'lightning/uiRecordApi';
import Certifications from '@salesforce/apex/getCertifications.Certifications'
const fields =[NAME];
export default class DisplayCert extends LightningElement 
{
    @api create = false; 
    @api recordId; 
    userId = Id;
    @wire (getRecord, {recordId: '$userId', fields}) user; 
    
    @wire(Certifications) certs; 

    get name()
    {
        
        return getFieldValue(this.user.data, NAME);
    }

    
    handleCreate(event)
    {
            
            if(this.create == false)
            {
                this.create = true; 
            }
            else
            {
                this.create = false; 
            }
            console.log(this.create); 
    }

    
}
