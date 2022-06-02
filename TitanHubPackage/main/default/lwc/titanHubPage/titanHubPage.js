import { LightningElement, api, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
export default class TitanHubPage extends LightningElement {

    //Variables that are set from Hero Hub Component
    @api titanId;
    @api accountId;

    currentPageReference = null;
    urlStateParameters = null;

    // Obtains the state parameters from the URL created by the HeroHub Component - titanDisplayBar
    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
        if (currentPageReference) {
            this.urlStateParameters = currentPageReference.state;
            this.setParametersBasedOnUrl();
        }
    }

    // Sets the Ids above based on the state parameters in the URL
    setParametersBasedOnUrl() {
        this.titanId = this.urlStateParameters.c__titanId || null;
        this.accountId = this.urlStateParameters.c__accountId || null;
    }

    loadProject(event) {
        const projectId = event.detail;
        this.template.querySelector('c-project-user-stories').projectId = projectId;
        this.template.querySelector('c-titan-summary').displayProject = true;
    }
}