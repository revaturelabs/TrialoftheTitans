({
	fetchTrueFalse : function(component) {
        var action = component.get('c.fetchTrueFalseQ');
        
        action.setCallback(this, (function(response) {
            var status = response.getState();
            if (status === "SUCCESS"){
                var holder = response.getReturnValue();
                var radioVal = component.get('v.radioValue');
                component.set('v.question', holder);
                console.log(holder);
            }
            else if(status === "INCOMPLETE"){
            	console.log("Server is not responding!");
            }
            else if(status === "ERROR"){
            	console.log("ERROR: " + errorMessage);
            }           
    }));
        $A.enqueueAction(action);
		
	}
})