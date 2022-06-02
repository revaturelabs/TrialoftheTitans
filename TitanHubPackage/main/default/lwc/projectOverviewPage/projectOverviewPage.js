import { api, LightningElement, wire } from 'lwc';
export default class ProjectOverviewPage extends LightningElement {
    /* button handlers */
    handleBackToTitanClick() {
        //nothing here yet
    }

    handleSubmitProjectClick() {
        //nothing here yet
        const modal = this.template.querySelector("c-roles-Modal");
        modal.show();
    }
}