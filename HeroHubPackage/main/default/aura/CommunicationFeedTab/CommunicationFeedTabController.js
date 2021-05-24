({
    // DESCRIPTION: Fires the tab selected event when a tab is clicked
    TabSelected : function( component, event, helper ) {
        let selectEvent = component.getEvent( "TabSelectEvent" );
        selectEvent.setParam( "tabName", component.get( "v.tabName" ) );
        selectEvent.fire();
    }
})
