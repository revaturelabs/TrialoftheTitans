import { LightningElement, api } from 'lwc';

export default class LwcCommunicationFeedControl extends LightningElement {

    @api
    tabs;

    @api
    activeTab;

    @api
    currentContent = [];

    @api
    loading;

    @api
    tabList;

    @api
    tabContent;

    @api
    newMessage;


    connectedCallback() {
        this.loading = true;
        this.currentContent = [];
    }

    get currentContentLengthIsZero(){
        if(this.currentContent.length == 0){
            return true;
        }
        else{
            return false;
        }
    }

    // DESCRIPTION: Used to populate the list that contains all of the tab names
    // PARAMETERS: - tabList : A string list of tab names
    populateTabs(e){
        //let params = new CustomEvent('arguments', {tabList: this.tabList});
        let params = e.detail.arguments;
        if(params){
            let tabList=params.tabList;
            this.tabs = tabList;
            this.activeTab = tabList[0];

            this.dispatchEvent(new CustomEvent('tabSelectedEvent'),{tabName: tabList[0]});
        }

        window.addEventListener( "wheel", function ( ev ) {
            let header = this.template.querySelector( "#feed-header:hover" );
            if ( header ) {
                if ( ev.deltaY > 0)
                    header.scrollLeft += 75;
                else
                    header.scrollLeft -= 75;
            }
        } );
    }

    // DESCRIPTION: Used to swap active tabs to the selected tab
    // PARAMETERS: - tabContent : A list of FeedElements from the selected group. The last element must be
    //               a string containing the name of the selected tab
    swapTabs(e){
        let params = e.detail.arguments;
        if(params){
            let tabContent = params.tabContent;
            let activeTab = tabContent.pop();
            this.activeTab = activeTab;
            this.currentContent = tabContent;
            this.loading = false;
        }
    }

    // **NOTE** THIS METHOD IS VISUAL ONLY, to post messages to Chatter, leverage CommunicationController.js : SendMessage()
    // DESCRIPTION: Used to add a message to the content list of the active tab
    // PARAMETERS:  - newMessage : the FeedElement to add to the content list
    addPostedMessage(e){
        //let params = new CustomEvent('arguments', {newMessage: this.newMessage});
        let params = e.detail.arguments;
        if(params){
            this.loading = false;
            let newMessage = params.newMessage;
            if(!newMessage){
                return;
            }
            let contentList = this.currentContent;
            contentList.splice(0, 0, newMessage);
            this.currentContent = contentList;
        }
    }

    //NewTabLoad and NewMessageLoad were put in the connectedCallback.
}