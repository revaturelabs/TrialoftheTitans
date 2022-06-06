//Authors: Adam Baird, Alberto Vergara, Tim Hinga, Austin McElrone
//Date: 5/13/22
//Purpose: Retrieves Exam Names and Titan Name associated to the Skill
import { LightningElement, wire, api } from 'lwc';
import getTitanName from '@salesforce/apex/AssignmentController.getTitanName';
import getCompletedAssignments from '@salesforce/apex/AssignmentController.getCompletedAssignmentsBySkill';

export default class assignmentCard extends LightningElement {
    @api skill;
    @wire(getTitanName, {skill:"$skill"}) titanName;
    @wire(getCompletedAssignments, {skill:"$skill"}) assignments;

   
    closeModal(event) {
        this.dispatchEvent(new CustomEvent('closemodal'));       
    }    
}