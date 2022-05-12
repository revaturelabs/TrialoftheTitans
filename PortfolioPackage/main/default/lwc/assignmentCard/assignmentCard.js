import { LightningElement, wire } from 'lwc';

import getExams from '@salesforce/apex/AssignmentController.getExams';

export default class assignmentCard extends LightningElement {
    @wire(getExams) Exams;
}