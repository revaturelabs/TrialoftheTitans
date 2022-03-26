/*
    Written by: David Labib
    Desc: The logic for the component for the project section 
        on the portfolio allowing the user to
        add,edit and delete projects

    Date Created: 03/25/22
    Last Modified Date: 03/25/2021
    Iteration XI
*/


import { LightningElement, track, wire } from 'lwc';
//importing all the apex methods from the portfolioProjectHelper class
import getProjects from '@salesforce/apex/portfolioProjectHelper.getProjects';
import setProjects from '@salesforce/apex/portfolioProjectHelper.setProjects';
import createProjects from '@salesforce/apex/portfolioProjectHelper.createProjects';
import deleteProjects from '@salesforce/apex/portfolioProjectHelper.deleteProjects';
import getAllProjects from '@salesforce/apex/portfolioProjectHelper.getALLProjects';
//importing these other things to use
import { refreshApex } from '@salesforce/apex'; 
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Lwcprojects extends LightningElement {
    @track wirevalue;
    @track projects;
    @track exist;
    @track projectDesc;
    error;
    projectName;
    AddModal = false;
    AllModal = false;
    newProjectNameVAR;
    AllProjects;
    // wire function to get the 3 latest projects for a specific user
    @wire (getProjects)
    wirevalue(value){
        const {error,data} = value;
        console.log('wire fire');
            if(data){
                    this.projects = data;
                    //Verifying if the record exists.
                    if(data.length<1){ 
                        this.exist=false;
                        console.log('yo?');
                        console.log(this.projects)
                    }
                    else {
                        this.exist=true;
                        this.projects = data;
                        console.log(this.projects, "mydata");
                    }
                }
            else if( error) {
                console.log('wire fail');
                this.error=error;
                console.log(this.error);
                
            }
        this.wirevalue=value;
    }
    //saves whatever the user writes
    handleChange(event) {
        this.projectDesc= event.target.value;
        refreshApex(this.wirevalue);
    }
    
    //called when the user hits save on a project
    handleSaveProject(e){
        //gets the project name that was clicked save on
        this.projectName = e.target.title;

        //probably dont need this part, this is to check if the project exisits
        //but it always does if the user can click save on it
        //keeping it just in case thought

        //called if the project doesnt exist
        if(!this.exist)
        {
            //make new project
            createProjects({projectInput:this.projectDesc})

            .then(() => {
                this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Record has been created',
                    variant: 'success'
                })
                
            );
            refreshApex(this.wirevalue);
            })
            

        }
        else{ 
            //update existing project with the project desc the user entered
            setProjects({projectInput : this.projectDesc, projectName: this.projectName})
            .then(() => {
                this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Record has been Updated',
                    variant: 'success'
                })
                
            );
            refreshApex(this.wirevalue);
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error While Updating Record',
                        message: error.message,
                        variant: 'error',
                    }),
                );
            });
            
        }
        
    }
    //function to delete the project when user clicks delete button
    deleteProject(e){
        this.projectName = e.target.name;
        deleteProjects({projectName:this.projectName})
        .then(() => {
            this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Record has been deleted',
                variant: 'success'
            })
            
        );
        refreshApex(this.wirevalue);
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error While deleting Record',
                    message: error.message,
                    variant: 'error',
                }),
            );
        });
    }

    //function called when the user adds a new project on the modal
    createProject(){
        this.showAddModal();
        createProjects({newProjectName:this.newProjectNameVAR})
        .then(() => {
            this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Record has been created',
                variant: 'success'
            })
            
        );
        refreshApex(this.wirevalue);
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error While creating Record',
                    message: error.message,
                    variant: 'error',
                }),
            );
        });
    }

    //function to toggel the add new project modal
    showAddModal(){
        this.AddModal = !this.AddModal;
    }
    
    //saves the new project name the user enters
    //this will be passed to the createProject function
    newProjectName(e){
        this.newProjectNameVAR = e.target.value;
    }

    //used to toggel the show all project modal
    //also makes apex call to get ALL of the projects the user has
    showAllModal(){
        getAllProjects({})
        .then(result => {
            this.AllProjects = result;
            console.log(this.cards);
        })
        .catch(error => {
            this.error = error;
            console.log(this.error);
        });


        this.AllModal = !this.AllModal;
    }
    
}