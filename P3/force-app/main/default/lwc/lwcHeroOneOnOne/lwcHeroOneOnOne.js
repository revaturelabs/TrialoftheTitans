/*
    Author: Matthew Kim
    Description: LWC component that checks feedback
    Date Created: 10/21/21
    Date Edited: 10/22/21
*/

import { LightningElement, api, wire } from "lwc";
import getOneOnOneId from "@salesforce/apex/HeroOneOnOneController.getOneOnOneId";

export default class LwcHeroOneOnOne extends LightningElement {
  @wire(getOneOnOneId)
  oneOneOneId;

  @api
  week = "A";

  @api
  showData = false;

  get options() {
    return [
      { label: "A", value: "A" },
      { label: "B", value: "B" },
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
      { label: "5", value: "5" },
      { label: "6", value: "6" },
      { label: "7", value: "7" },
      { label: "8", value: "8" },
      { label: "9", value: "9" }
    ];
  }

  onchange(event) {
    this.selectedTitle = event.detail.value;
    this.showData = true;
  }
}
