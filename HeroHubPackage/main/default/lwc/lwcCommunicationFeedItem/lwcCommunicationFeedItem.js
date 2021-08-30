import { LightningElement, api } from 'lwc';

export default class LwcCommunicationFeedItem extends LightningElement {
    @api
    content;
    
    connectedCallback(){
        this.contentHeader();
        this.contentBody();
    }
    
    contentHeader(){
        if(this.content.header.text == null){
            this.content.header.text = "";
        }
        return this.content.header.text;
    }

    contentBody(){
        if(this.content.body.text == null){
            this.content.body.text = "";
        }
        return this.content.body.text;
    }
    
}