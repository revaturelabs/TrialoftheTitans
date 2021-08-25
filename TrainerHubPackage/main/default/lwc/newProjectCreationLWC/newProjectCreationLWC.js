import { LightningElement,api } from 'lwc';
import projectNameIsAvailable from '@salesforce/apex/NewProjectCreationAuraController.projectNameIsAvailable';
// import ShowToastEvent from 'lightning/platformShowToastEvent'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const evt = new ShowToastEvent({
    title: 'Warning',
    message: 'This is a warning message',
    variant: 'warning',
    mode: 'dismissable'
});

export default class NewProjectCreationLWC extends LightningElement {

    enteredName = '';
    enteredDescription = '';

    //Called when the Project Name field loses focus. Checks if project name already exists, and shows an error if so.
    checkIfProjectExists(event) {
        console.log('check if proj exists');
        projectNameIsAvailable({name: this.enteredName})
        .then(result => {
            if (!result) {
                console.log('unavailable');
                this.dispatchEvent(evt);
            }
        })
        .catch(error => {
            console.log('error: ', error);
        });
    }

    cancelNewProjectCreation(event) {
        console.log('cancel button click');
    }

    createNewProject(event) {
        console.log('create button click');
    }

    handleNameChange(event){
        this.enteredName = event.target.value;
    }

    handleDescriptionChange(event) {
        this.enteredDescription = event.target.value;
    }
}