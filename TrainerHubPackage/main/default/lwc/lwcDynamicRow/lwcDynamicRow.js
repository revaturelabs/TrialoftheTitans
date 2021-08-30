import retrieveCurrentEquivalencies from "@salesforce/apex/dynamicRowAuraController.retrieveCurrentEquivalencies";
import saveEquivalency from "@salesforce/apex/dynamicRowAuraController.saveEquivalency";
import { LightningElement, wire, api, track } from "lwc";

export default class LwcDynamicRow extends LightningElement {
  @api currentPage;
  @api projectId;
  @track equivList = [];

  @wire(retrieveCurrentEquivalencies, { projectId: "$projectId" })
  currentEqs;

  connectedCallback() {
    this.createEquivalencyData();
  }

  /* We loop through our current equivalencies and add them to a set
    then we loop through our equiv rows and make sure they aren't empty and that they aren't
    duplicates and if they pass both those checks we add them to our set.
    If we make it through the entire list and pass all of our checks isValid should
    be true and we return isValid.
  */
  validateRequired() {
    let isValid = true;
    let uniqueSkills = new Set();
    let allEquivRows = this.equivList;
    let currentEquivs = this.currentEqs;

    for (let i = 0; i < currentEquivs.length; i++) {
      uniqueSkills.add(currentEquivs[i].Skill__c);
    }

    for (let i = 0; i < allEquivRows.length; i++) {
      if (allEquivRows[i].Skill__c == "") {
        isValid = false;
        alert("Skill can't be blank on row " + (i + 1));
      } else if (uniqueSkills.has(allEquivRows[i].Skill__c)) {
        isValid = false;
        alert("Can't add the same skill on row " + (i + 1));
      } else {
        uniqueSkills.add(allEquivRows[i].Skill__c);
      }
    }
    return isValid;
  }

  
  createEquivalencyData() {
    this.equivList.push({
      Project__c: this.projectId,
      Skill__c: "",
      Skill_Equivalency__c: "",
    });
  }

  // if it passes the validation then we save it
  save() {
    if (this.validateRequired()) {
      saveEquivalency({ equivList: this.equivList });
      this.equivList = [];
      this.createEquivalencyData();
      alert("Records Saved");
      this.currentPage = "homePage";
    }
  }

  cancel() {
    this.currentPage = "homePage";
  }

  addrowHandler() {
    this.createEquivalencyData();
  }

  // deletes the row by splicing the equiv list to exclude the specific index
  deleterowHandler(event) {
    let i = event.detail;
    let allRowsList = this.equivList;
    allRowsList.splice(i, 1);
    this.equivList = allRowsList;
  }
}
