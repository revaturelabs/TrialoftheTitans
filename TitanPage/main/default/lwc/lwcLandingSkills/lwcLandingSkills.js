import { LightningElement, api, wire } from "lwc";
import getSkills from "@salesforce/apex/TitanPageApexController.getSkills";

export default class LwcLandingSkills extends LightningElement {
  @api
  activetitan;

  @wire(getSkills, { titanId: "$activetitan.Id" })
  skillsList;

  get name() {
    let titanName = "Titan";
    if (this.activetitan && this.activetitan.Name) {
      titanName = this.activetitan.Name;
    }
    return titanName;
  }

  get cardTitle() {
    return this.name + " Skills";
  }

  get hasData() {
    return this.listData.length == 0 ? false : true;
  }

  get noSkills() {
    return "No skills associated with " + this.name;
  }

  get listData() {
    let data = [];
    if (
      this.skillsList &&
      this.skillsList.data &&
      Array.isArray(this.skillsList.data)
    ) {
      data = this.skillsList.data;
    }
    return data;
  }
}
