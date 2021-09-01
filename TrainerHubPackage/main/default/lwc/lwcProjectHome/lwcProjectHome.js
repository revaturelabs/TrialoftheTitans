import retrieveProjects from "@salesforce/apex/ProjectHomeController.retrieveProjects";
import { LightningElement, track, wire } from "lwc";

export default class LwcProjectHome extends LightningElement {
  // Project home is self contained so I didn't see a need to use any @api/@track decorators except on projectList
  currentPage;
  errorMessage;
  selectedProjId;
  @track projectList;

  // wire the retrieveProjects method from the apex controller to get the project list
  // store the data into the projectList property and any errors into the errorMessage property
  @wire(retrieveProjects)
  getProjectList({ error, data }) {
    if (data) {
      this.projectList = data;
      console.log('got project list',data);
      this.errorMessage = undefined;
    } else if (error) {
      this.errorMessage = error;
      this.projectList = undefined;
    }
  }

  // simply changing the current page.
  edit(event) {
    this.selectedProjId = event.target.id;
    this.currentPage = "dynamicRow";
  }

  assign(event) {
    this.selectedProjId = event.target.id.substring(0,18);
    // trim it to 18 characters, since a "-0" gets added to the end.
    this.currentPage = "AssignProject";
  }

  addNewProject() {
    this.currentPage = "NewProjectCreation";
  }

  connectedCallback() {
    this.currentPage = "homePage";
  }

  cancelFromNPCorAP() {
    this.currentPage = "homePage";
  }

  // Used for if:true directive
  get isHomePage() {
    return this.currentPage == "homePage" ? true : false;
  }

  get isAssignProject() {
    return this.currentPage == "AssignProject" ? true : false;
  }

  get isNewProjectCreation() {
    return this.currentPage == "NewProjectCreation" ? true : false;
  }

  get isDynamicRow() {
    return this.currentPage == "dynamicRow" ? true : false;
  }
}
