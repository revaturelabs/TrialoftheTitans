/////////////////////////////////////////////////////
//
//  Name: TitanTabHelper.js
//  Author: David Serrano
//  Created: 5/13/2021
//  Updated: 5/28/2021
//  Description: Javascript helper that handles the logic required behind a tab click
//
///////////////////////////////////////////////////

({
    // handlecClick(): fires an application event with the titan name as a parameter to help change the gamepath display
    
	handleClick: function( component, event ) {
		console.log(component.get("v.name") + " clicked");
        let clickEvent =  $A.get("e.c:TitanClickedEvent");
        let titan = component.get("v.name");
        clickEvent.setParams({"titan" : titan });
        clickEvent.fire();
	}
})