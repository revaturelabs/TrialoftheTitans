({
    fetchData : function(component) {
        var action = component.get('c.CodingExamList');
        
        var cohortId = component.get('v.CohortId');
		action.setParams({
			"cohortId": cohortId
        });
        
           action.setCallback(this, (function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                //have the data in the server in a variable
                var data = response.getReturnValue();
                //for loop to set key for the coloumn with data
                for( let i=0; i< data.length; i++ ){
                	console.log(data[i]);
                }
                 component.set('v.data', data);			        
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
         }));
        $A.enqueueAction(action);
    }
        
      
})