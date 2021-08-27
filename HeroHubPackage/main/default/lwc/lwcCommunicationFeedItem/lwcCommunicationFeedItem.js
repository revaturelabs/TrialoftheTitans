import { LightningElement, api } from 'lwc';

export default class LwcCommunicationFeedItem extends LightningElement {
    @api
    content;
    
    /*
    @api contentHeader(){
        if(this.content.header.text == null){
            this.content.header.text = "";
        }
        return this.content.header.text;
    }

    @api contentBody(){
        if(this.content.body.text == null){
            this.content.body.text = "";
        }
        return this.content.body.text;
    }
    */
}