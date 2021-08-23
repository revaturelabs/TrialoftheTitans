import { LightningElement, api } from 'lwc';

export default class LwcCommunicationFeedCompose extends LightningElement {
    @api
    activeTab;

    submitMessage(e){
        let message = this.template.querySelector("#message-body");
        if(!message.value){
            return;
        }

        this.dispatchEvent(new CustomEvent('sendEvent'),{'message': message.value, 'activeTab' : this.activeTab});
        message.value = "";
    }

}