({
	handleClick: function( component, event ) {
		console.log(component.get("v.name") + " clicked");
        let clickEvent =  $A.get("e.c:TitanClickedEvent");
        let titan = component.get("v.name");
        clickEvent.setParams({"titan" : titan });
        clickEvent.fire();
	}
})