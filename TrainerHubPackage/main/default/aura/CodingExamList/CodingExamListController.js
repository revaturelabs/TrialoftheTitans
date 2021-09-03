({
	fetchData : function(component, event, helper) {
		//set columns for datatable
        component.set('v.columns',[
            { label: 'Test Name', fieldName: 'Name', type: 'text'},
            { label: 'Passed %', fieldName: 'Percent_Passed__c', type: 'double'}
        ]);
            
        // get Hero Assessment data
        helper.fetchData(component);
	}
})