import { LightningElement,api } from 'lwc';
import projectNameIsAvailable from '@salesforce/apex/NewProjectCreationAuraController.projectNameIsAvailable';
import setNewProject from '@salesforce/apex/NewProjectCreationAuraController.setNewProject';

export default class NewProjectCreationLWC extends LightningElement {

    enteredName = '';
    enteredDescription = '';

    //Called when the Project Name field loses focus. Checks if project name already exists, and shows an error if so.
    checkIfProjectExists(event) {
        this.checkIfProjectExistsAndSubmitIfApplicable(false);
    }

    checkIfProjectExistsAndSubmitIfApplicable(shouldSubmitAfterCheck) {
        projectNameIsAvailable({name: this.enteredName})
        .then(result => {
            var inputCmp = this.template.querySelector('[data-id="projName"]');
            if (!result) {
                inputCmp.setCustomValidity("Project name already used. Please select another name.");
            } else {
                inputCmp.setCustomValidity("");
            }
            inputCmp.reportValidity();
            if (result && shouldSubmitAfterCheck) {
                this.createNewProjectAfterNameDuplicateValidityChecked();
            }
        })
        .catch(error => {
            console.log('error: ', error);
        });
    }

    cancelNewProjectCreation(event) {
        this.sendCancelEventToParent(event);
    }

    sendCancelEventToParent(event) {
        const custEvent = new CustomEvent(
            'cancel', {
                detail: event.target.value});
        this.dispatchEvent(custEvent);
    }

    createNewProject(event) {
        // Check if the project name already exists, and try to submit if good.
        this.checkIfProjectExistsAndSubmitIfApplicable(true);
    }

    createNewProjectAfterNameDuplicateValidityChecked() {

        var inputCmp = this.template.querySelector('[data-id="projName"]');
        if (!inputCmp.checkValidity()) {
            inputCmp.reportValidity();
            return;
        }

        setNewProject({name: this.enteredName, description: this.enteredDescription})
        .then(result => {
            //If no errors are returned, display alert to let user know record has been inserted.
            alert("Project successully created!"); 
            setTimeout(function() {
            window.location.reload();//reload page

            })
        })
        .catch(error => {
            alert("Failed to create project.");
            console.log('error: ', error);
        });
    }

    handleNameChange(event){
        this.enteredName = event.target.value;
    }

    handleDescriptionChange(event) {
        this.enteredDescription = event.target.value;
    }
}