({
	// get Heroes from the server
    fetchData : function(component) {
        var action = component.get('c.HeroList');
        var cohortId = component.get('v.CohortId');
		action.setParams({
			"cohort": cohortId
        });
        action.setCallback(this, (function (response) {
            if (response.getState() === "SUCCESS") {
                var data = response.getReturnValue();
                //for loop to get name instead of id for field
                for( let i=0; i< data.length; i++ ){
                    var row = data[i];
                    if(row.Squad__c){
                        row.Squad__c = row.Squad__r.Name;
                    }
                    if(row.Team__c){
                        row.Team__c = row.Team__r.Name;
                    }
                }
                component.set('v.data', data);
            } 
        }));
        $A.enqueueAction(action);
    },
})