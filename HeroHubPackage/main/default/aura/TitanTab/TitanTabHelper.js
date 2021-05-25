({
	handleClick: function( component, event ) {
		console.log(component.get("v.name") + " clicked");
        let clickEvent = component.getEvent("TitanClickedEvent");
        let titan = component.get("v.name");
        clickEvent.setParam( "titan" , titan );
        clickEvent.fire();
	}
})