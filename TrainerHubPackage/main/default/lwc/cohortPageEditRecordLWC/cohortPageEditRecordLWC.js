import { LightningElement,track,api } from 'lwc';


export default class CohortPageEditRecordLWC extends LightningElement {

  
   
    @api AssessmentId

//creates new assessment 
handleClick(){
    this.dispatchEvent(new CustomEvent('cmpreturnevent',{
        bubbles:true
    }));
}

}