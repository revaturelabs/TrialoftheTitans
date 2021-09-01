import { LightningElement,api } from 'lwc';

export default class CohortPageHeroAssessmentEditRecord extends LightningElement {
    @api HeroAssessmentId

    //creates new hero assessment 
    handleClick(){
        this.dispatchEvent(new CustomEvent('cmpreturnevent',{
            bubbles:true
        }));
    }
}