import { LightningElement, wire} from 'lwc';
import getSkills from '@salesforce/apex/UserInfoHelper.getDonutData'

export default class skillsList extends LightningElement {
    @wire (getSkills) skills;

    clickEvent(event) {
        let skill = event.target.dataset.id;
        this.dispatchEvent(new CustomEvent('skillclick', {detail: skill}));
    }
}