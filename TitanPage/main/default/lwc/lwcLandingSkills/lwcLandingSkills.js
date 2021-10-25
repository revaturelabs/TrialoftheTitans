/*

  Title: lwcLandingSkills
  Author: Colin Poirier
  Created date: 10/16/2021
  Description: Js file for component that fetches org data
  Modified date: 10/20/2021
  Modified by: Colin Poirier

*/

import { LightningElement, api, wire } from "lwc";
import getSkills from "@salesforce/apex/TitanPageApexController.getSkills";

export default class LwcLandingSkills extends LightningElement {
  @api
  activetitan;

  @wire(getSkills, { titanId: "$Id" })
  skillsList;

  // had to make getter to satisfy testing even
  // thought passing activetitan.Id in directly
  // worked fine in the org
  get Id() {
    if (this.activetitan) {
      return this.activetitan.Id;
    }
  }  

  // give default name to titan
  get name() {
    let titanName = "Titan";
    if (this.activetitan && this.activetitan.Name) {
      titanName = this.activetitan.Name;
    }
    return titanName;
  }

  // appends skills to titan name
  get cardTitle() {
    return this.name + " Skills";
  }

  // used to display no skills message
  get hasData() {
    return this.listData.length != 0;
  }

  // message displayed when no data is available
  get noSkills() {
    return "No skills associated with " + this.name;
  }

  // return skill data if exists or empty array
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