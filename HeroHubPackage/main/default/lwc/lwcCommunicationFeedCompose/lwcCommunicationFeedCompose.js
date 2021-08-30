import { LightningElement, api } from 'lwc';

export default class LwcCommunicationFeedCompose extends LightningElement {
    @api
    activeTab;

    submitMessage(e){
        let message = this.template.querySelector('[data-id="message-body"]');;
        if(!message.value){
            return;
        }
        message.value = "";
        this.dispatchEvent(new CustomEvent('sendEvent'),{message: message.value, activeTab : this.activeTab});
    }

}