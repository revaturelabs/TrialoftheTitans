import { LightningElement } from 'lwc';
import fetchPastCohorts from '@salesforce/apex/TrainerHubPastCohortsTableAuraController.fetchPastCohorts'
import fetchActiveCohort from '@salesforce/apex/TrainerHubPastCohortsTableAuraController.fetchActiveCohort'

const columns = [
    {label: 'Cohort', fieldName: 'Name', type: 'text'},
    {label: '', type: 'button', initialWidth: 135, typeAttributes: { label: 'Go To Page', name: 'view_details', title: 'Click to Go To Cohorts Page'}}
];

export default class TrainerHubAndCohortsPageLWC extends LightningElement {

    shouldShowCohortPage = false;
    chosenCohortId = '';

    columns = columns;
    data = [];

    get cohortPageActive() {
        return this.shouldShowCohortPage;
    }

    get cohortId() {
        return this.chosenCohortId;
    }

    transferToActiveCohort() {
        console.log('transfer to active cohort');

        fetchActiveCohort()
        .then(result => {
            if (result) {
                console.log('got active cohort');
                console.log(result);
                
                this.chosenCohortId = result;
                this.shouldShowCohortPage = true;
            }
        })
        .catch(error => {
            console.log('error: ', error);
        });

    }

    returnToTrainerHub() {
        console.log('return');
        this.shouldShowCohortPage = false;
    }

    connectedCallback() {
        fetchPastCohorts()
        .then(result => {
            if (result) {
                console.log('got,,,');
                console.log(result);
                this.data = result;
            }
        })
        .catch(error => {
            console.log('error: ', error);
        });
    }

    rowClickedAction(event) {
        const recordId = event.target.dataset.recordid;
        const row = event.detail.row;
        const { Id } = row;
        console.log(Id);

        this.chosenCohortId = Id;
        this.shouldShowCohortPage = true;
    }
}