({
    // DESCRIPTION: Used to populate the list that contains all of the tab names
    // PARAMETERS: - tabList : A string list of tab names
    PopulateTabs : function ( component, event, helper ) {
        var params = event.getParam( "arguments" );
        if ( params ) {
            let tabList = params.tabList;
            component.set( "v.tabs", tabList );
            component.set( "v.activeTab", tabList[0] );

            let selectEvent = component.getEvent( "TabSelectEvent" );
            selectEvent.setParam( "tabName", tabList[0] );
            selectEvent.fire();
        }

        window.addEventListener( "wheel", function ( ev ) {
            let header = document.querySelector( "#feed-header:hover" );
            if ( header ) {
                if ( ev.deltaY > 0)
                    header.scrollLeft += 75;
                else
                    header.scrollLeft -= 75;
            }
        } );
    },

    // DESCRIPTION: Used to swap active tabs to the selected tab
    // PARAMETERS: - tabContent : A list of FeedElements from the selected group. The last element must be
    //               a string containing the name of the selected tab
    SwapTabs : function ( component, event, helper ) {
        var params = event.getParam( "arguments" );
        if ( params ) {
            let tabContent = params.tabContent;
            let activeTab = tabContent.pop();
            component.set( "v.activeTab", activeTab );
            component.set( "v.currentContent", tabContent );
            component.set( "v.loading", false );
        }
    },

    // **NOTE** THIS METHOD IS VISUAL ONLY, to post messages to Chatter, leverage CommunicationController.js : SendMessage()
    // DESCRIPTION: Used to add a message to the content list of the active tab
    // PARAMETERS:  - newMessage : the FeedElement to add to the content list
    AddPostedMessage : function ( component, event, helper ) {
        var params = event.getParam( "arguments" );
        if ( params ) {
            component.set( "v.loading", false );
            let newMessage = params.newMessage;
            if ( !newMessage )
                return;
                
            let contentList = component.get( "v.currentContent" );
            // Splice to message to the first position of the array
            contentList.splice( 0, 0, newMessage );
            component.set( "v.currentContent", contentList );
        }
    },

    NewTabLoad : function ( component, event, helper ) {
        component.set( "v.loading", true );
        component.set( "v.currentContent", [] );
    },

    NewMessageLoad : function ( component, event, helper ) {
        component.set( "v.loading" , true );
    }
})