({
	Init : function(component, event, helper) {
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
		helper.fetchData(component);
	},
    //get Exam Result data and set the columns of the datatable
    fetchData : function(component, event, helper) {
        // get Hero Assessment data
        helper.fetchData(component);
    },
})