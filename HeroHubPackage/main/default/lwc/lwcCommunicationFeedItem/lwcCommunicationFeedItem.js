import { LightningElement, api } from 'lwc';

export default class LwcCommunicationFeedItem extends LightningElement {
    @api
    content;
    
    /*
    get contentHeader(){
        if(this.content.header.text == null){
            this.content.header.text = "";
        }
        return this.content.header.text;
    }

    get contentBody(){
        if(this.content.body.text == null){
            this.content.body.text = "";
        }
        return this.content.body.text;
    }
    */
}