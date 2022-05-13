//importing all the apex methods from the portfolioProjectHelper class
import { LightningElement, track, wire } from "lwc";
import getProjects from "@salesforce/apex/portfolioProjectHelper.getProjects";
import getResponsibilities from "@salesforce/apex/portfolioProjectHelper.getProjects";

export default class Feats_projects extends LightningElement {
    error;
    @track exist;
    @track wirevalue;
    @track projects;

    //responsibilities
    @track responsibilitiesWireValue;
    @track responsibilities;

    activeSectionMessage = "";

    handleToggleSection(event) {
        this.activeSectionMessage = "Open section name:  " + event.detail.openSections;
    }

    // wire function to get the 3 latest projects for a specific user
    @wire(getProjects)
    wirevalue(value) {
        const { error, data } = value;
        console.log("wire fire");
        if (data) {
            this.projects = data;
            //Verifying if the record exists.
            if (data.length < 1) {
                this.exist = false;
                console.log("no projects available");
                console.log(this.projects);
            } else {
                this.exist = true;
                this.projects = data;
                console.log(this.projects, "mydata");
            }
        } else if (error) {
            console.log("wire fail");
            this.error = error;
            console.log(this.error);
        }
        this.wirevalue = value;
    }

}
