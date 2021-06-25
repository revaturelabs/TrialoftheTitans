({
	doinit : function(component, event, helper) {
		helper.getHeroResultsList(component);
		// console.log(component.get('v.examResultId'))
	},
	testClick: function(cmp, event, helper) {
		console.log(cmp.get('v.hResults'))
	}
})