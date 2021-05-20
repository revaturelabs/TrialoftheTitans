({
    ExpandFeed : function ( feedBody ) {
        feedBody.classList.remove("feed-collapsed");
        feedBody.classList.add("feed-expanded");
    },

    CollapseFeed : function ( feedBody ) {
        feedBody.classList.remove("feed-expanded");
        feedBody.classList.add("feed-collapsed");
    }
})