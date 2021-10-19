/*

  Title: lwcLandingSkills
  Author: Colin Poirier
  Created date: 10/16/2021
  Description: Js file for component that fetches org data
  Modified date: 10/19/2021
  Modified by: Colin Poirier

*/

import { LightningElement, api, wire } from "lwc";
import getExams from "@salesforce/apex/TitanPageApexController.getExams";

export default class LwcExamsLanding extends LightningElement {
  @api
  activetitan;

  @wire(getExams, { titanId: "$Id" })
  examsList;  

  // had to make getter to satisfy testing even
  // thought passing activetitan.Id in directly
  // worked fine in the org
  get Id() {
    if(this.activetitan){
      return this.activetitan.Id;
    }
    return 'HI';
  }

  // give default name to titan
  get name() {
    let titanName = "Titan";
    if (this.activetitan && this.activetitan.Name) {
      titanName = this.activetitan.Name;
    }
    return titanName;
  }

  // appends exams to titan name
  get cardTitle() {
    return this.name + " Exams";
  }

  // used to display no exams message
  get hasData() {
    return this.listData.length == 0 ? false : true;
  }

  // message displayed when no data is available
  get noExams() {
    return "No exams associated with " + this.name;
  }

  // return exam data if exists or empty array
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
