import { LightningElement, wire} from 'lwc';
<<<<<<< HEAD
import getSkills from '@salesforce/apex/UserInfoHelper.getDonutData'

export default class skillsList extends LightningElement {
    @wire (getSkills) skills;

    clickEvent(event) {
        let skill = event.target.dataset.id;
        this.dispatchEvent(new CustomEvent('skillclick', {detail: skill}));
    }
=======
import getSkills from '@salesforce/apex/getDataForDonut.getDonutData'

export default class FeatsList extends LightningElement {
    @wire (getSkills) skills;

    /*feats = ['Git', 'APIs', 'Security', 'Triggers', 'Declarative',
'Object Manager', 'Data Modeling', 'LWC', 'Aura', 'Algorithms']; */
>>>>>>> 1ca2866c4065b0e6d75dfd38e8aeb2e3e8ea250d

}