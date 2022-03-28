///////////////////////////////////////////////////////////////////////////////// 
// 
// Name: lwcPathToTitan
// Author (Driver): Bailey Kandler, Phillip Nguyen-Phan
// Additional Authors (Navigator) : Mohamed Adam, Jeffrey Cooke, Adrian Mata, Rudy Lamug
// CSS Done by : Mohamed Adam
// Created: 02/10/2022
// Updated: 02/16/2022
// Description: Displays the current exams assigned to the User(Account)
// 
/////////////////////////////////////////////////////////////////////////////////

import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getAccount from "@salesforce/apex/PathToTitanController.getAccount";
import getSquad from "@salesforce/apex/PathToTitanController.getSquad";
import getExamAndResultsList from "@salesforce/apex/PathToTitanController.getExamAndResultsList";

export default class LwcPathToTitan extends NavigationMixin(LightningElement) {

    // Variables to Display Hero Details at Top of Component
    heroArete;
    heroTitle;
    heroName;
    squadName;

    //Variables to receive from Hero Hub Component
    @api titanId;
    @api accountId;

    //Wire functions to get Account and Squad Information based on current user
    @wire(getAccount) accInfo;
    @wire(getSquad) squadInfo;

    // Wire function to get all the Exam Results associated with the provided Titan and Account Id
    @wire(getExamAndResultsList, {titanId: '$titanId', accountId:'$accountId'}) 
    examAndResultsList;

    // Initialization Function to Populate Some Basic Information
    renderedCallback() {
        if (this.accInfo.data && this.squadInfo.data) {
            console.log( this.accInfo.data);
            this.heroName = "Our Hero's Name: " + this.accInfo.data.Name;
            this.squadName = "Our Hero's Squad: " + this.squadInfo.data.Name;
            this.heroArete = "Our Hero's Arete: 390"; // HARD CODED
            this.heroTitle = "Our Hero's Title: Perseus"; // HARD CODED
        } 
    }

    // Navigation Function to pass examId and accountId to lwcExamInterview
    handleExamClick(event) {
        let exam_data_attribute = event.target.getAttribute("data-exam");
        console.log(exam_data_attribute);
       
        this[NavigationMixin.Navigate]({
            type: "comm__namedPage",
            attributes: {
                name: "Exam_Interview__c"//API name of the page to navigate to
            },
             state: {
                c__examId: exam_data_attribute,
                c__accId: this.accountId
             }
        });
    }
}