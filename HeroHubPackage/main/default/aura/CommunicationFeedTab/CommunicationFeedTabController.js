({
    // DESCRIPTION: Fires the tab selected event when a tab is clicked
    TabSelected : function( component, event, helper ) {
        if ( component.get( "v.tabName" ) == component.get( "v.activeTab" ) )
            return;
            
        let selectEvent = component.getEvent( "TabSelectEvent" );
        selectEvent.setParam( "tabName", component.get( "v.tabName" ) );
        selectEvent.fire();
    }
})
