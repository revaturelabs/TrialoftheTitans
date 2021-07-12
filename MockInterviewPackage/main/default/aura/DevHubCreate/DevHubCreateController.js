/*
 * Author: James Patton
 * Description: Creates all mock data to get org to work correctly and prevents missing data that cause components to not look good
 * Date: 08/07/2021
 * 
 * */

({
	CreateMockData : function(component, event, helper) {
        let action = component.get("c.CreateMockData");

        // Call the GetGroups method in CommunicationController and populate the tab names
        action.setCallback( this, function ( response ) {
            if ( response.getState() == "SUCCESS" ) {
                console.log('Data created');
                component.set('v.success', 'Created mock data');
            }
        } );
        $A.enqueueAction( action );
    }
})