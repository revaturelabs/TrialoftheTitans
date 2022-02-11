import { LightningElement, api, wire } from 'lwc';

import getAccount from "@salesforce/apex/PathToTitanController.getAccount";
import getSquad from "@salesforce/apex/PathToTitanController.getSquad";
import getExamList from "@salesforce/apex/PathToTitanController.getExamList";

export default class LwcPathToTitan extends LightningElement {

    // Variables to receive from previous Component
    @api titanId;
    @api accountId;

    @wire(getAccount) accInfo;
    @wire(getSquad) squadInfo;

    // Lists to grab Exams & ExamResults related to Titan
    examList = []; // ?? Wrapper Class to Hold Exam__c Object and Priority Tag / Unique Key for Iterator ??
    examResultList = [];

    // Variables to Display Hero Details at Top of Component
    heroArete;
    heroTitle;
    heroName;
    squadName;

    // Initialization Function to Populate Some Basic Information
    renderedCallback() {
        if (this.accInfo.data && this.squadInfo.data) {
            this.heroName = this.accInfo.data.Name;
            this.squadName = this.squadInfo.data.Name;
            this.heroArete = "Our Hero's Arete: 19";
            this.heroTitle = "Our Hero's Title: Perseus";
        }
    }
    // Initialization Function to Retrieve Exam List Related to Current Titan
    connectedCallback() {
        this.init();
    }
    async init() {
        try {
            this.examList = getExamList(this.titanId);
        }catch(error) {
            console.log(error);
        }
    }

    // Navigation Function to pass titanId and accountId to lwcExamInterview
    handleExamClick() {

    }

}