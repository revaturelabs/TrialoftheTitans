import { LightningElement,api } from 'lwc';
import projectNameIsAvailable from '@salesforce/apex/NewProjectCreationAuraController.projectNameIsAvailable';
import setNewProject from '@salesforce/apex/NewProjectCreationAuraController.setNewProject';
// import { ShowToastEvent } from 'lightning/platformShowToastEvent';

// const evt = new ShowToastEvent({
//     title: 'Warning',
//     message: 'This is a warning message',
//     variant: 'warning',
//     mode: 'dismissable'
// });

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
                // this.dispatchEvent(evt);
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
        setNewProject({name: this.enteredName, description: this.enteredDescription})
        .then(result => {
            //If no errors are returned, display toast to let user know record has been inserted.
            component.find("componentNotif").showToast({"Title" : "New Project Created!", "variant" : "success", 
            "message" : "Project successfully created!"});
            //Blank input fields.
            component.find("nameInput").set("v.value", "");
            component.find("descInput").set("v.value", "");
            //Redirect to homepage.
            component.set("v.currentPage", "homePage");
            setTimeout(function() {
            window.location.reload();//reload page

            })
        })
        .catch(error => {
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