({
    // DESCRIPTION: Swaps the feed classes to expand the feed box
    // PARAMETERS:  - feedBody : the component to expand
    ExpandFeed : function ( feedBody ) {
        feedBody.classList.remove( "feed-collapsed" );
        feedBody.classList.remove( "feed-initial" );
        feedBody.classList.add( "feed-expanded" );
    },

    // DESCRIPTION: Swaps the feed classes to collapse the feed box
    // PARAMETERS:  - feedBody : the componenet to collapse
    CollapseFeed : function ( feedBody ) {
        feedBody.classList.remove( "feed-expanded" );
        feedBody.classList.add( "feed-collapsed" );
    },

    // DESCRIPTION: Gets the names of groups from a list of CollaborationGroups and populates tabs with them
    // PARAMETERS:  - component : the aura component (Communication.cmp)
    //              - groups : a list of CollaborationGroups to extract the names from
    ExtractAndSetGroupNames : function ( component, groups ) {
        let tabNames = [];

        for ( let group of groups ) {
            tabNames.push( group.Name );
        }

        if ( tabNames.length == 0 ) {
            tabNames.push( "No Feeds Assigned" );
        }
        
        let feedControl = component.find( "feed" );
        feedControl.PopulateTabs( tabNames );
    },

    // DESCRIPTION: Given a valid name for a group, returns that groups ID
    // PARAMETERS:  - component : the aura component (Communication.cmp)
    //              - tabName : the name of the desired tab
    GetGroupIdFromTabName : function ( component, tabName ) {
        let groupList = component.get( "v.userGroups" );

        for ( let group of groupList ) {
            if ( group.Name == tabName ) {
                return group.Id;
            }
        }
        return "";
    },

    // DESCRIPTION: Retrieves the content from the input ID and refreshes the content view
    // PARAMETERS:  - component : the aura component (Communication.cmp)
    //              - groupId : the ID of the group to get the content from
    //              - tabName : the name of the active group
    RefreshFeed : function ( component, groupId, tabName ) {
        let getGroupContent = component.get( "c.GetGroupContent" );
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