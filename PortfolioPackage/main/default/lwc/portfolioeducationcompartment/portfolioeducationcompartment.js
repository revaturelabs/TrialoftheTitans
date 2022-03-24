import { LightningElement, track, wire, api } from 'lwc';
import RETURN_EDUCATION from '@salesforce/apex/GetEducationInformation.returnEducationList';
import { refreshApex } from '@salesforce/apex';
//import CARDBONEDUCATION from '@salesforce/resourceUrl/carboneducation';
export default class Portfolioeducationcompartment extends LightningElement {
    //carboneducation = CARDBONEDUCATION; 

    @track education;
    @track wireValue;

    @wire(RETURN_EDUCATION)
    educationList(value) {
        const {error, data} = value;
        this.education = data;
        this.wireValue = value;
    }
    
    
}