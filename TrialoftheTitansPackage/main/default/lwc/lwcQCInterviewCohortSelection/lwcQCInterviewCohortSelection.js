import { LightningElement, wire, api } from "lwc";
import getHeroes from "@salesforce/apex/QCInterviewCohortSelectionAuraController.getHeroes";
import NAME_FIELD from "@salesforce/schema/Account.Name";
import ID_FIELD from "@salesforce/schema/Account.Id";
import COHORT_FIELD from "@salesforce/schema/Account.Cohort__c";
import SQUAD_FIELD from "@salesforce/schema/Account.Squad__c";
import TEAM_FIELD from "@salesforce/schema/Account.Team__c";
/* Commented out by William Rembish 10/17/2021
 * Reason: incomplete and unworking code
const columns = [
    { label: 'Account Name', fieldName: 'NAME_FIELD' },
    { label: 'Cohort', fieldName: 'COHORT_FIELD' },
    { label: 'Squad', fieldName: 'SQUAD_FIELD' },
    { label: 'Team', fieldName: 'TEAM_FIELD' }
];
*/

export default class LwcQCInterviewCohortSelection extends LightningElement {
  @api
  columns;

  /* Commented out by William Rembish 10/17/2021
     * Reason: incomplete and unworking code
    columns = columns;
    
    @wire(getHeroes)
    accounts;

    handleRowSelection(event){
        const selectedRows = event.detail.selectedRows;
        component.set(this.currentHero, event.getParam('selectedRows')[0]);
    }

    launchInterview(event){

    }

    */
}