import { LightningElement, wire, api, track } from 'lwc';
import getExams from '@salesforce/apex/AssignmentController.getExams';

export default class assignmentCard extends LightningElement {
    @api skill;
    @wire(getExams, {skill}) Exams;
    
    @track isModalOpen = true;
    openModal(event) {
       
        this.isModalOpen = true;
    }
    closeModal(event) {
        
        this.isModalOpen = false;
    }
}

