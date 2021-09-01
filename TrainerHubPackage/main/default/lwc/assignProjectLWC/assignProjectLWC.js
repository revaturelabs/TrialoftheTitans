import { LightningElement, api } from 'lwc';
import getAccounts from '@salesforce/apex/AssignProjectController.getAccounts'
import getCohorts from '@salesforce/apex/AssignProjectController.getCohorts'
import assignProject from '@salesforce/apex/AssignProjectController.assignProject'

export default class AssignProjectLWC extends LightningElement {

    @api
    projectId;

    groupByValue = 'individual';

    selectedDualListboxValues = [];

    accountOptions = [];
    cohortOptions = [];

    connectedCallback() {

        getAccounts()
        .then(result => {
            if (result) {
                let accs = result;
                let items = [];
                let accountToIgnore = 'Sample Account for Entitlements';
                for (let i = 0; i < accs.length; i++) {
                    if (accs[i].Name == accountToIgnore) {
                        continue; // Don't add the auto-generated SF background account
                    }
                    const item = {
                        'label': accs[i].Name,
                        'value': accs[i].Name
                    };
                    items.push(item);
                }
                this.accountOptions = items;
            }
        })
        .catch(error => {
            console.log('error: ', error);
        });

        getCohorts()
        .then(result => {
            if (result) {
                let cohs = result;
                let items = [];
                for (let i = 0; i < cohs.length; i++) {
                    const item = {
                        'label': cohs[i].Name,
                        'value': cohs[i].Name
                    };
                    items.push(item);
                }
                this.cohortOptions = items;
            }
        })
        .catch(error => {
            console.log('error: ', error);
        });
    }

    get groupByOptions() {
        return [
            { label: 'Individual(s)', value: 'individual' },
            { label: 'Cohort(s)', value: 'cohort' }
        ];
    }

    handleGroupByChange(event) {
        this.groupByValue = event.detail.value;
    }

    get dualListboxOptions() {
        return this.groupByValue === 'individual' ? this.accountOptions : this.cohortOptions;
    }

    handleDualListboxChange(event) {
        this.selectedDualListboxValues = event.detail.value;
    }

    cancelAssignProject(event) {
        this.sendReturnToHomePageEvent(event);
    }

    sendReturnToHomePageEvent(event) {
        const custEvent = new CustomEvent(
            'cancel', {
                detail: event.target.value});
        this.dispatchEvent(custEvent);
    }

    submitAssignProject(event) {
        var options = this.selectedDualListboxValues;

        // Make sure at least one name is selected
        if (options.toString().trim().length == 0) {
            alert('Please select at least one value.');
            return;
        }

        let names = (options+'').split(',');

        assignProject({
            grouping : this.groupByValue,
            namesToAssign : names,
            projectIdToAssign : this.projectId
        })
        .then(result => {
            alert('Successfully assigned project!');
            this.sendReturnToHomePageEvent(event);
        })
        .catch(error => {
            console.log('error: ', error);
        });
    }
}