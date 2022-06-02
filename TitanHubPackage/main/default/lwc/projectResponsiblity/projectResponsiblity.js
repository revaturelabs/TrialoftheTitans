// Name: Project Responsibility
// Author: Rhys Kim
// Created: 6/1/2022
// Updated: TBA
// Description: Responsibility section in Project Submission page

import getResponsibilities from '@salesforce/apex/ProjectController.getResponsibilities';
import { LightningElement, track, api, wire } from 'lwc';

export default class ProjectResponsiblity extends LightningElement {

  hasResponsibility = false;
  // fetch information here
  @wire(getResponsibilities, {})
  // dummy method atm until i get some help for this
  fetchResponsibilities({error, data}) {
    if (data) {
      console.log(data);
    } else {
      console.log(error);
    }
  }

  // modal code
  @track isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  
  confirmDelete() {
    this.isModalOpen = false;
    // responsibility should be destroyed here
  }

}