({
	Init : function(component, event, helper) {
		helper.Init(component);
	},
    //get Exam Result data and set the columns of the datatable
    fetchData : function(component, event, helper) {
        // get Hero Assessment data
        helper.fetchData(component);
    },
})