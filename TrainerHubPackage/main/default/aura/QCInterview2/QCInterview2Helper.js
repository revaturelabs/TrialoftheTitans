/////////////////////////////////////////////////////
//
//  Name: Exam List Helper
//  Author: Josue Cisneros
//  Description: Client-side JS Helper for the QC
//               Interview component.                
//
///////////////////////////////////////////////////

({
    // get Exam Results from the server
    fetchData : function(component) {
        let action = component.get('c.InterviewList');
        let cohortId = component.get('v.CohortId');
		action.setParams({
			"cohortId": cohortId
        });
        action.setCallback(this, (function (response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                //have the data in the server in a letiable
                let data = response.getReturnValue();
                //for loop to set key for the coloumn with data
                for( let i=0; i< data.length; i++ ){
                    //if data retrieved is null place value stating it is null
                    //if not null place data in the key for the column
                    if(data[i].Account__c == null){
                        data[i].hero = "No Hero";
                    } else{
                        data[i].hero = data[i].Account__r.Name;
                    }
                }
                //set the new data to the table
                component.set('v.data', data);
            } else if (state === "ERROR") {
                let errors = response.getError();
                console.error(errors);
            }
        }));
        $A.enqueueAction(action);
    },
})