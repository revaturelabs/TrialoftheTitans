({
	onInit : function(component, event, handler){
		let pageRef = component.get("v.pageReference");
		let session = sessionStorage.getItem('ActiveCohort');
		if(pageRef){
			component.set("v.CohortId", pageRef.state.c__CohortId);

		}
		if(session){
			component.set("v.Cohort", JSON.parse(session));

		}

	}
})