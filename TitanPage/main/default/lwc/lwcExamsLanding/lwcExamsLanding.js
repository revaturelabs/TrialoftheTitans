import { LightningElement, api, wire } from "lwc";
import getExams from "@salesforce/apex/TitanPageApexController.getExams";

export default class LwcExamsLanding extends LightningElement {
  @wire(getExams)
  activetitan;

  @wire(getExams, { titanId: "$activetitan.Id" })
  examsList;

  get name() {
    let titanName = "Titan";
    if (this.activetitan && this.activetitan.Name) {
      titanName = this.activetitan.Name;
    }
    return titanName;
  }

  get cardTitle() {
    return this.name + " Exams";
  }

  get hasData() {
    return this.listData.length == 0 ? false : true;
  }

  get noExams() {
    return "No exams associated with " + this.name;
  }

  get listData() {
    let data = [];
    if (
      this.examsList &&
      this.examsList.data &&
      Array.isArray(this.examsList.data)
    ) {
      data = this.examsList.data;
    }
    return data;
  }
}
