import { LightningElement, api } from 'lwc';

export default class LwcCommunicationFeedTab extends LightningElement {
    @api
    index = -1;
    @api
    tabName = "No Name";
    @api
    activeTab = "None";

    get feedTabClass(){
        return this.tabName == this.activeTab ? 'active-tab' : 'tab';
    }

    get feedTabId(){
        return 'feed-tab-' + this.index;
    }

    tabSelected(e){
        if (this.tabName == this.activeTab)
            return;
            
        /*let selectEvent = new CustomEvent('selectEvent');
        selectEvent.tabName = this.tabName;
        this.dispatchEvent(selectEvent);*/
        this.dispatchEvent(new CustomEvent('selectEvent'),{tabName: this.tabName});
    }
}