import { LightningElement,api } from "lwc";
    export default class QuestionTableCmp extends LightningElement{
        SelectChohort(){
            let selectedCohort = getSource().get("v/value");
            FireCohortUpdate(component, selectedCohort);


        }
        FireCohortUpdate() {
            // Fire UpdateCohortEvent, which will launch a method to update the currently selected cohort in QCHubHome
            // with the event's SelectedCohort parameter
            let cohortUpdate = component.getEvent("UpdateCohortEvent");
            cohortUpdate.setParams({"SelectedCohort" : cohort});
            
            this.dispatchEvent();
        }

    }