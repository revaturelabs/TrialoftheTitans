({
    // DESCRIPTION: Used to initialize the component with the groups the context user is in
    DoInit : function ( component, event, helper ) {
        let getGroups = component.get("c.GetGroups");

        // Call the GetGroups method in CommunicationController and populate the tab names
        getGroups.setCallback( this, function ( response ) {
            if ( response.getState() == "SUCCESS" ) {
                component.set("v.userGroups", response.getReturnValue() );
                helper.ExtractAndSetGroupNames( component, response.getReturnValue() );
            }
        } );
        $A.enqueueAction( getGroups );
    },

    // DESCRIPTION: Used to collapse and shrink the feed box
    OnHeaderClick : function ( component, event, helper ) {
        let feedBody = document.querySelector( "#feed-holder" );

        if ( feedBody.classList.contains( "feed-collapsed" ) || feedBody.classList.contains( "feed-initial" ) ) {
            helper.ExpandFeed( feedBody );
            return;
        }
        helper.CollapseFeed( feedBody );
    },

    // DESCRIPTION: Handles the tab selected event and populates the chatter messages with the new tab group
    // PARAMETERS:  - tabName : The name of the selected tab
    ChangeTabs : function ( component, event, helper ) {
        let tabName = event.getParam( "tabName" );
        let groupId = helper.GetGroupIdFromTabName( component, tabName );

        let getGroupContent = component.get("c.GetGroupContent");
        getGroupContent.setParams( { "groupId" : groupId } );

        // Call the GetGroupContent method in CommunicationController and populate the feed content
        getGroupContent.setCallback( this, function ( response ) {
            if ( response.getState() == "SUCCESS" ) {
                let feedControl = component.find( "feed" );
                let content = response.getReturnValue();

                // Append the new active tab name for the feed control
                content.push( tabName );
                feedControl.SwapTabs( content );
            }
        } );
        $A.enqueueAction( getGroupContent );
    }
})