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
}