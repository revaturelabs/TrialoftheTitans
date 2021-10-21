import { LightningElement, wire, api } from "lwc";

import getHeroResults from "@salesforce/apex/HeroAnswerResults.getHeroResults";
export default class HeroResultsLwc extends LightningElement {
  @api resultId = "a091F00000BK2jYQAT";
  hResults = [];
  @wire(getHeroResults, { examResultId: "$resultId" })
  wiredResults({ error, data }) {
    console.log(data);
    console.log(error);
    if (data) {
      this.hResults = data;
    }
  }
}
