import { LightningElement, wire} from 'lwc';
import getSkills from '@salesforce/apex/SkillsController.getSkills'

export default class FeatsList extends LightningElement {
    @wire (getSkills) skills;

    /*feats = ['Git', 'APIs', 'Security', 'Triggers', 'Declarative',
'Object Manager', 'Data Modeling', 'LWC', 'Aura', 'Algorithms']; */

}