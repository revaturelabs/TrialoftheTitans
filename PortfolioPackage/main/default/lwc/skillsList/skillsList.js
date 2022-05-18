/* Javascript controller for the list of skills earned on the portfolio page
    Authors: Tim Hinga, Adam Baird, Alberto Vergara, Austin McElrone
    Date: May 13, 2022 */

import { LightningElement, wire, track} from 'lwc';
import getSkills from '@salesforce/apex/AssignmentController.getCompletedAssignmentsSkillMap';

export default class skillsList extends LightningElement {
    @track skills = [];
    @wire (getSkills) skillsMap ({error, data}) {
        if (data) {
            //Push each skill from returned Map to the skills array
            for (let key in data) {
                if (key != null)
                    this.skills.push(key);
            }
        }
    }


    //Method that gets the skill clicked and dispatches an event with the skill name
    clickEvent(event) {
        let skill = event.target.dataset.id;
        this.dispatchEvent(new CustomEvent('skillclick', {detail: skill}));
    }

}