({
    fireNav : function( component, event, helper ) {

        const fireNav = component.getEvent( "navigatePage" );

        fireNav.setParam( "page", event.currentTarget.innerHTML );

        fireNav.fire();
    }
})