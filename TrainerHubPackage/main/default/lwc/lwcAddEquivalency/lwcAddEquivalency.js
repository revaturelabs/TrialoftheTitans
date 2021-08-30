import { LightningElement, api, track, wire } from "lwc";
import getSkills from "@salesforce/apex/addEquivalencyComponentAuraController.getSkills";

export default class LwcAddEquivalency extends LightningElement {
  //projectId is kinda sus not sure what it's
  //used for in this component but its value is set in a parent comopnent
  @api projectId;

  rowIndex;
  @api equivalencyList;
  @track skills = [];
  @track value = "";

  @wire(getSkills) skillList;
  skills = skillList.map(function (skill) {
    return { label: skill.Name, value: skill.Name };
  });

  @api
  get rowIndex() {
    return this.rowIndex + 1;
  }

  set rowIndex(num) {
    this.rowIndex = num;
  }

  handleChange(event) {
    this.value = event.detail.value;
  }

  // Components that need to handle these events when created
  // should take in HTML attribute onaddrow/ondeleterow
  // example:
  // <c-dynamic-row onaddrow={addrowHandler} ondeleterow={deleterowHandler}>
  addRow() {
    this.dispatchEvent(new CustomEvent("addrow"));
  }

  deleteRow() {
    this.dispatchEvent(new CustomEvent("deleterow", { detail: this.rowIndex }));
  }
}
