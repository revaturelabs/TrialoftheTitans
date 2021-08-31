import { LightningElement,track,wire,api } from 'lwc';
import GetAssessmentList from '@salesforce/apex/FetchAssessmentList.GetAssessmentList'

export default class AssessmentListLWC extends LightningElement {


    @track data;
    @api AssessmentId
    @api show=false;
    
    //Just a Boolean for the main parent component, controlled by both events,
	//Lists id return event turns it to true, edit record page turns it to false
    @track ShowChosenAssessment=false;

@track columns = [
   
        /*{ label: 'View', type: 'button', initialWidth: 135, typeAttributes: { label: 'View Details', name: 'view_details', title: 'Click to View Details'}},*/
        { label: 'Name', fieldName: 'Name', type: 'text'},
        { label: 'Type', fieldName: 'Type__c', type: 'text'},

    ];

    //converted event functionality from 'showRowDetails'
    //unable to get the 'View Detals' typeAttributes button to display information
    updateSelected(event){
        const row=event.detail.row;
        this.AssessmentId=row;
    }
    //converted events from aura
    handleReturnComponentEvent() {
        this.ShowChosenAssessment=false;
		this.fetchAssessmentHeroData();
    }
    //converted events from aura
    handleReturnAssessmentIdEvent() {
        //String for Id which is set by the CohortPageEditRecordLWC
        this.AssessmentId=AssessmentId;
        this.ShowChosenAssessment=true;
    }

    //wired method to fetch the data rendred on the data table
    @wire(GetAssessmentList) fetchAssessmentHeroData({error,data})
    {
        console.log(data)
       if(data){
          
           this.data=data
           
           }  
    
       }

    

   handleReturnAssessmentIdEvent() {
    
    // set the handler attributes based on event data
    this.ShowChosenAssessment=true
}


}


