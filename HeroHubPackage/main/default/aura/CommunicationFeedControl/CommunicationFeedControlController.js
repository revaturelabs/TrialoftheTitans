({
    // DESCRIPTION: Used to populate the list that contains all of the tab names
    // PARAMETERS: - tabList : A string list of tab names
    PopulateTabs : function ( component, event, helper ) {
        var params = event.getParam( "arguments" );
        if ( params ) {
            let tabList = params.tabList;
            component.set( "v.tabs", tabList );
            component.set( "v.activeTab", tabList[0] );
        }
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
        }
    }
})
