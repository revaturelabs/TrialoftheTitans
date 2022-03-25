import { LightningElement, track, wire } from 'lwc';

import getProjects from '@salesforce/apex/portfolioProjectHelper.getProjects';
import setProjects from '@salesforce/apex/portfolioProjectHelper.setProjects';
import createProjects from '@salesforce/apex/portfolioProjectHelper.createProjects';
import deleteProjects from '@salesforce/apex/portfolioProjectHelper.deleteProjects';
import getAllProjects from '@salesforce/apex/portfolioProjectHelper.getALLProjects';

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

    handleChange(event) {
        this.projectDesc= event.target.value;
        refreshApex(this.wirevalue);
    }
    

    handleSaveProject(e){
        this.projectName = e.target.title;
        if(!this.exist)
        {
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

    showAddModal(){
        this.AddModal = !this.AddModal;
    }
    
    newProjectName(e){
        this.newProjectNameVAR = e.target.value;
    }

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