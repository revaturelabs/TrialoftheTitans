import { LightningElement, api, track } from "lwc";
import getSkills from "@salesforce/apex/addEquivalencyComponentAuraController.getSkills";

export default class AddEquivalency extends LightningElement {
  @api projectId;
  @api equivalencyInstance;
  @api rowIndex;
  skillList;
  @track skills = [];
  @track value = "";
  @track chosen = "";

  connectedCallback() {
    getSkills()
      .then((result) => {
        this.skillList = result;
        this.skills = result.map(function (skill) {
          return { value: skill.Name, label: skill.Name };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange(event) {
    const selection = event.detail.value;
    console.log("selected value:" + selection);
    this.chosen = selection;
  }
  addRow() {
    this.dispatchEvent(new CustomEvent("addRow"));
  }

  deleteRow() {
    this.dispatchEvent(new CustomEvent("deleteRow", { detail: this.rowIndex }));
  }
}
