({
	// get Heroes from the server
    fetchData : function(component) {
        let action = component.get('c.HeroList');
        let cohortId = component.get('v.CohortId');
		action.setParams({
			"cohort": cohortId
        });
        action.setCallback(this, (function (response) {
            if (response.getState() === "SUCCESS") {
                let data = response.getReturnValue();
                //for loop to get name instead of id for field
                for( let i=0; i< data.length; i++ ){
                    let row = data[i];
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
    
    	Init : function(component, event) {
		component.set('v.columns',[
            { label: 'Hero', fieldName: 'Name', type: 'text'},
            { label: 'Squad', fieldName: 'Squad__c', type: 'text'},
            { label: 'Team', fieldName: 'Team__c', type: 'text'},
            { label: '1-on-1', fieldName: 'Website', type: 'url', typeAttributes: { 
                    label: 'Zoom link',
                	target: '_self'
                },
            },

        ]);
		this.fetchData(component);
	}
    
})