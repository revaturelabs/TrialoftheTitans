// Name: Project Responsibility
// Author: Rhys Kim
// Created: 6/1/2022
// Updated: TBA
// Description: Responsibility section in Project Submission page

import getResponsibilities from '@salesforce/apex/ProjectController.getResponsibilities';
import getProjectInfo from "@salesforce/apex/UserStoryController.getProjectInfo";
import { LightningElement, track, api, wire } from 'lwc';

export default class ProjectResponsiblity extends LightningElement {

  hasResponsibility = false;
  // fetch information here
  @api titanId;
    @api projectId;
    // get responsibility Id 
    // get name from skill  using respons Id
    
    @wire(getProjectInfo,{titanId: '$titanId'})
        getProject({error, data}) {
            if (data) {
                this.projectId = data.Id;
            }
            else if (error) {
                console.error(error);
            }
    }
  @wire(getResponsibilities, {})
  // dummy method atm until i get some help for this
  fetchResponsibilities({error, data}) {
    if (data) {
      console.log(data);
    } else {
      console.log(error);
    }
  }

  // save user input and submit it to the server
  saveInfo() {

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