//Authors: Adam Baird, Alberto Vergara, Tim Hinga, Austin McElrone
//Date: 5/13/22
//Purpose: Retrieves Exam Names and Titan Name associated to the Skill 
import { LightningElement, wire, api } from 'lwc';
import getExams from '@salesforce/apex/AssignmentController.getExams';
import getTitanName from '@salesforce/apex/AssignmentController.getTitanName';
import examLogo from '@salesforce/resourceUrl/examLogo';

export default class assignmentCard extends LightningElement {
    @api skill;
    @wire(getExams, {skill:"$skill"}) Exams;
    @wire(getTitanName, {skill:"$skill"}) titanName;
    logo = examLogo;
   
    closeModal(event) {
        this.dispatchEvent(new CustomEvent('closemodal'));
    }    
}
