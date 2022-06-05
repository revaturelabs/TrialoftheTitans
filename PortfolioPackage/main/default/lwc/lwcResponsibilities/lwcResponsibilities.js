import { LightningElement, track, wire, api} from 'lwc';
import viewList from './lwcResponsibilities.html';
import getResponsibilities from '@salesforce/apex/ResponsibilitiesController.getResponsibilities';

export default class LwcResponsibilities extends LightningElement {

    @api projectId;
    responsibilities;
    filteredResponsibilities;

    @wire(getResponsibilities, {projectID: '$projectId'})
    fetchResponsibilities({error, data}) {
        if (data) {
            console.log('This is working');
            this.responsibilities = data;
            this.filteredResponsibilities = [...this.responsibilities];
        } else if (error) { 
            console.log('This is not working');
            console.error(error);
        }
    }    
}