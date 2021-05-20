({
    onHeaderClick : function ( component, event, helper ) {
        let feedBody = document.querySelector( "#feed-holder" );
        if ( feedBody.classList.contains( "feed-collapsed" ) ) {
            helper.ExpandFeed( feedBody );
            return;
        }

        helper.CollapseFeed( feedBody );
    }
})