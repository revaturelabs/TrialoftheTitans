import { LightningElement, api, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import {
    subscribe,
    APPLICATION_SCOPE,
    MessageContext
} from 'lightning/messageService';
import titanSelected from '@salesforce/messageChannel/TrialOfTheTitansXIChannel__c';
export default class TitanHubPage extends LightningElement {

    //Variables that are set from Hero Hub Component
    @api titanId;
    @api accountId;

    @wire(MessageContext)
    messageContext;

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

    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                titanSelected,
                (message) => this.handleMessage(message), { scope: APPLICATION_SCOPE }
            );
        }
    }

    handleMessage(message) {
        console.log(message)

    }
}