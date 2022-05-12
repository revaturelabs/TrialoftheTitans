import { LightningElement, wire, api } from 'lwc';

import getExams from '@salesforce/apex/AssignmentController.getExams';

export default class assignmentCard extends LightningElement {
    @api skill;
    @wire(getExams, {skill}) Exams;
}