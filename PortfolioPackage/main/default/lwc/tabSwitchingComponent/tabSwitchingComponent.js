import { LightningElement, track, wire, api } from 'lwc';
import getProjects from "@salesforce/apex/portfolioProjectHelper.getProjects";
import getResponsibilities from "@salesforce/apex/portfolioProjectHelper.getProjects";
import mountainStaticImg from '@salesforce/resourceUrl/mountainStaticImg';

export default class TabSwitchingComponent extends LightningElement {

    //allows for use of mountain static image
    mountainUrl = mountainStaticImg;

    error;
    @track wirevalue;
    @track projects;
    @api buttonToDisplay;

    //responsibilities
    @track responsibilitiesWireValue;
    @track responsibilities;

    // wire function to get the 3 latest projects for a specific user
    @wire(getProjects)
    wirevalue(value) {
        const { error, data } = value;
        //console.log("wire fire");
        if (data) {
            this.projects = data;
            //Verifying if the record exists.
            if (data.length < 1) {
                this.exist = false;
                //console.log("no projects available");
                //console.log(this.projects);
            } else {
                this.exist = true;
                this.projects = data;
                //console.log(this.projects, "mydata");
            }
        } else if (error) {
            //console.log("wire fail");
            this.error = error;
            console.log(this.error);
        }
        this.wirevalue = value;
    }

    renderedCallback(){

        // selects all projectdisplaycomponents in the template
        const projectDisplayComponents = this.template.querySelectorAll('.projectDisplayComponent');

        // selects each individual the projectdisplaycomponents and adds a clickable event listener to each one
        projectDisplayComponents.forEach(projectDisplayComponent =>{
        projectDisplayComponent.addEventListener('click', event =>{

        // whenever clicked, add a classList of active to it
        projectDisplayComponent.classList.toggle('active');

        // create variable to check for parent
        const displayContentContainer = projectDisplayComponent.nextElementSibling;

        // if parent contains active in class list, change its height to show content
        if(projectDisplayComponent.classList.contains('active')){
          displayContentContainer.style.maxHeight = displayContentContainer.scrollHeight+"px";
        } else {
          // otherwise, remove content from view
          displayContentContainer.style.maxHeight = 0;
        }
      });
    });

    }
    

}