({
	initD3Charts : function(component, event, helper) {
	
        // Calling server-action to get the data
        let action = component.get("c.getDataMap");
        let groupData=[];
        // Create a callback that is executed after
        // the server-side action returns
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                groupData = response.getReturnValue();
               

                // Render the returned data as a Bar chart
                const data = JSON.stringify(groupData);
            
                helper.renderChart( component, data );
            }
        });
 
        $A.enqueueAction(action);
            
	}
    
})