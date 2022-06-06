import { LightningElement, track, wire, api } from 'lwc';
import getProjects from "@salesforce/apex/portfolioProjectHelper.getProjects";
import mountainStaticImg from '@salesforce/resourceUrl/mountainStaticImg';
export default class TabSwitchingComponent extends LightningElement {

    //allows for use of mountain static image
    mountainUrl = mountainStaticImg;

    @track projects;
    @api buttonToDisplay;

    // wire function to get the 3 latest projects for a specific user
    @wire(getProjects)
    fetchLatestProjects({error, data}) {
        if (data) {
            this.projects = data;
        } 
        else if (error) {        
            console.error(error);
        }
    }

}