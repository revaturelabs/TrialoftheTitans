///////////////////////////////////////////////////////////////////////////////// 
// 
// Name: titanHubCertDetails
// Author: Alan Huang
// Created: 01/25/2022
// Updated: 01/25/2022
// Description: Certification details component for Hero Hub - Titan Overview
// 
/////////////////////////////////////////////////////////////////////////////////

import { LightningElement, wire, api } from 'lwc';
import getCertDetails from '@salesforce/apex/titanHubCertDetailsController.getCertDetails';

export default class TitanHubCertDetails extends LightningElement {

    certDetails = [];

    @api titanId;
    @wire(getCertDetails, { titanId: '$titanId' })
    fetchCertDetails({ error, data }) {
        if (data) {
            this.certDetails = data;
            this.error = undefined;
            console.log(this.certDetails);
            console.error(error);
        } else if (error) {
            this.certDetails = undefined;
            this.error = error;
            console.error(error);
        }
    };
    
    

}
