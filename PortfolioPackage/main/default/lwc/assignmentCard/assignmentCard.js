<<<<<<< HEAD
import { LightningElement, wire, api, track } from 'lwc';
=======
import { LightningElement, wire } from 'lwc';
>>>>>>> 1ca2866c4065b0e6d75dfd38e8aeb2e3e8ea250d

import getExams from '@salesforce/apex/AssignmentController.getExams';

export default class assignmentCard extends LightningElement {
<<<<<<< HEAD
    @api skill;
    @wire(getExams, {skill}) Exams;
=======
    @wire(getExams) Exams;
>>>>>>> 1ca2866c4065b0e6d75dfd38e8aeb2e3e8ea250d
    
    @track isModalOpen = true;
    openModal(event) {
       
        this.isModalOpen = true;
    }
    closeModal(event) {
        
        this.isModalOpen = false;
    }
}
