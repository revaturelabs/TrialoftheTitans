import { api, LightningElement, wire } from 'lwc';

import GetGroupContent from '@salesforce/apex/CommunicationController.GetGroupContent';
import GetGroups from '@salesforce/apex/CommunicationController.GetGroups';
import PostMessageToGroup from '@salesforce/apex/CommunicationController.PostMessageToGroup';

export default class LwcCommunication extends LightningElement {

    @api
    userGroups;

    @api
    lastInterval;

    @wire(GetGroupContent) groupContent;
    @wire(GetGroups) getGroups;
    @wire(PostMessageToGroup) postMessageToGroup;

    async connectedCallback() {
        try{
            this.userGroups = await this.getGroups;
            extractAndSetGroupNames(userGroups);
        }
        catch(error){
            console.log("Error: ", error);
        }
    }
    

    onHeaderClick(e){
        let feedBody = this.template.querySelector('[data-id="feed-holder"]');

        if ( feedBody.classList.contains( "feed-collapsed" ) || feedBody.classList.contains( "feed-initial" ) ) {
            feedBody.classList.remove( "feed-collapsed" );
            feedBody.classList.remove( "feed-initial" );
            feedBody.classList.add( "feed-expanded" );
            return;
        }
        feedBody.classList.remove( "feed-expanded" );
        feedBody.classList.add( "feed-collapsed" );
    }

    // DESCRIPTION: Handles the TabSelectEvent and populates the chatter messages with the new tab group
    // PARAMETERS:  - tabName : The name of the selected tab
    changeTabs(e) {
        let tabName = e.detail.tabName;
        let groupId = helper.GetGroupIdFromTabName( component, tabName );

        // Clear the previous interval
        clearInterval(this.lastInterval);

        // Get the content from the initial event request
        refreshFeed(groupId, tabName);

        if ( groupId == "" )
            return;

        // Get the content and refresh every minute
        let interval = setInterval( function () {
            refreshFeed(groupId, tabName);
        }, 10000 );
        this.lastInterval = interval;
    }

    // DESCRIPTION: Handles the MessageSendEvent and posts the message to the active chatter group
    // PARAMETERS:  - message : the message to post
    //              - activeTab : the name of the active group
    SendMessage(e) {
        let message = e.detail.message;
        let activeGroup = getGroupIdFromTabName(e.detail.activeTab);
        console.log('In sending message' + e.detail.message + e.detail.activeTab);

        if ( activeGroup == "" ) {
            let feedControl = component.find( "feed" );
            feedControl.addPostedMessage( null );
            return;
        }

        //Call the PostMessageToGroup method in CommunicationController and update the feed content
        this.postMessageToGroup.groupId = activeGroup;
        this.postMessageToGroup.message = message;
        let newMessage = this.postMessageToGroup;
        let feedControl = this.template.querySelector('[data-id="feed"]');
        feedControl.addPostedMessage(newMessage); 
    }



    /*HELPER METHODS*/

    // DESCRIPTION: Gets the names of groups from a list of CollaborationGroups and populates tabs with them
    // PARAMETERS:  - groups : a list of CollaborationGroups to extract the names from
    extractAndSetGroupNames(groups) {
        let tabNames = [];

        for ( let group of groups ) {
            tabNames.push( group.Name );
        }

        if ( tabNames.length == 0 ) {
            tabNames.push( "No Feeds Assigned" );
        }
        
        let feedControl = this.template.querySelector('[data-id="feed"]');
        feedControl.populateTabs( tabNames );
    }
    
    // DESCRIPTION: Given a valid name for a group, returns that groups ID
    // PARAMETERS:  - tabName : the name of the desired tab
    getGroupIdFromTabName(tabName){
        let groupList = this.userGroups;

        for ( let group of groupList ) {
            if ( group.Name == tabName ) {
                return group.Id;
            }
        }
        return "";
    }
    
    // DESCRIPTION: Retrieves the content from the input ID and refreshes the content view
    // PARAMETERS:  - component : the aura component (Communication.cmp)
    //              - groupId : the ID of the group to get the content from
    //              - tabName : the name of the active group
    async refreshFeed(groupId, tabName){
        try{
            this.groupContent.groupId = await groupId;
            let feedControl = this.template.querySelector('[data-id="feed"]');
            let content = this.groupContent;
            content.push(tabName);
            feedControl.swapTabs(content);
        }
        catch(error){
            console.log("Error: ", error);
        }
        
    }
    
}