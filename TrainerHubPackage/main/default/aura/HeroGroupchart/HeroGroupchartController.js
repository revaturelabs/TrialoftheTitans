({
	initD3Charts : function(component, event, helper) {
	
        // Calling server-action to get the data
        var action = component.get("c.getDataMap");
        var groupData=[];
        // Create a callback that is executed after
        // the server-side action returns
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                groupData = response.getReturnValue();
               
                //const mapdata = new Map(Object.entries(groupData));
                //console.log(groupData);
                // Render the returned data as a Bar chart
                const data = JSON.stringify(groupData);
                //console.log(data);
                helper.renderChart( component, data );
            }
        });
 
        $A.enqueueAction(action);
            
	}
    
})