({
    fetchData : function(component) {
        let action = component.get('c.CodingExamList');
        
        let cohortId = component.get('v.CohortId');
		action.setParams({
			"cohortId": cohortId
        });
        
           action.setCallback(this, (function (response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                //have the data in the server in a variable
                let data = response.getReturnValue();
                //for loop to set key for the coloumn with data
                for( let i=0; i< data.length; i++ ){
                	console.log(data[i]);
                }
                 component.set('v.data', data);			        
            } else if (state === "ERROR") {
                let errors = response.getError();
                console.error(errors);
            }
         }));
        $A.enqueueAction(action);
    }
        
      
})