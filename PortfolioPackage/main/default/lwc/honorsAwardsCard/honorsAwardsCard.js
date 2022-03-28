/*
    Author: Drew Williams
    Description: Card container for Honors & Awards section in Portfolio
    Created Date: 3/17/22 
*/
import { LightningElement, track, wire } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Award__c.Name';
import DATE_FIELD from '@salesforce/schema/Award__c.Date_Received__c';
import getAwards from '@salesforce/apex/honorsAwardsCardHelper.getAwards';
import {refreshApex} from '@salesforce/apex';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class HonorsAwardsCard extends LightningElement {
  @track
  isShowingModal = false;

  @track
  awardsList;
  nameField = NAME_FIELD;
  receivedDate = DATE_FIELD;
  wireValue;

  // Opens modal
  openModal() {
    this.isShowingModal = true;

  }

  // Closes modal
  closeModal() {
    this.isShowingModal = false;
  }

  @wire(getAwards)
  awards(value){
    
    const{error, data} = value;
    if(data) {this.awardsList=data}
    else if(error) {console.log(error)}
    console.log(this.awardsList);
    this.wireValue = value;
  };

  handleSuccess() {
    refreshApex(this.wireValue);
    this.isShowingModal = false;
  }

  // Delete Toast
  handleDelete(event) {
    let recordId=event.currentTarget.dataset.awardvalue;
    console.log(recordId);
    deleteRecord(recordId)
    .then(()=>{
      this.dispatchEvent(
        new ShowToastEvent({
            title: 'Success',
            message: 'Category Has Been Deleted',
            variant: 'success'
        })

      )
      refreshApex(this.wireValue);
    }
    )
    .catch(error=>{
      this.dispatchEvent(
        new ShowToastEvent({
            title: 'Error',
            message: error.message,
            variant: 'error'
        }),
      );
    });
  }
}