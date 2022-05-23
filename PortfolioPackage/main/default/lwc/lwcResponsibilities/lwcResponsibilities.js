//import { LightningElement, track, wire } from "lwc";
//import getSomeAccounts from "@salesforce/apex/ResponsibilitiesController.getSomeAccounts";
//export default class LwcResponsibilities extends LightningElement {
 //   @track data
 //   @track columns = [
       // { label: 'Responsibilities', fieldName: 'Name', type: 'text'},
       // { label: 'Label', fieldName: 'Trainer__r.Name', type: 'text'},
        // {label: 'Label', fieldName: 'Name', type: 'text'},
        //{ label: 'Phone', fieldName: 'Phone', type: 'phone'},
       // { label: 'Industry', fieldName: 'Industry', type: 'text'},
    //];
   // @wire (getSomeAccounts) accountRecords({error,data}){
      //  if(data){
      //      this.data = data;
      //  }
      //  else if (error){
     //       this.data = undefined;
     //   }
  //  }
//}

import { LightningElement, track, wire, api} from 'lwc';
import viewList from './lwcResponsibilities.html';
import getResponsibilities from '@salesforce/apex/ResponsibilitiesController.getResponsibilities';

export default class LwcResponsibilities extends LightningElement {

    @api getProjectidFromParent;
    @track responsibilities;
    @track filteredResponsibilities;
    @track wirevalue;
    filtered = false;

    templateOne = false;
    render(){
        return this.templateOne === false? viewList:viewList;
    }

    click(){
        this.templateOne = this.templateOne ===true ? false : true;
    }

    @wire(getResponsibilities/*, {projectID: '$getProjectidFromParent'}*/)
    wirevalue(value) {
       
        const { error, data } = value;
        console.log("wire fire");
        if (data) {
            this.responsibilities = data;
            //Verifying if the record exists.
            if (data.length < 1) {
                console.log("no responsibilities available");
                console.log(this.responsibilities);
            } else {
                this.responsibilities = data;
                console.log(this.responsibilities, "mydata");
            }
        } else if (error) {
            console.log("wire fail");
            this.error = error;
            console.log(this.error);
        }
    }

    //handler for filtered display
    //removes any responsibilityIDs that are not selected
    //sets filtered to true;
    
}