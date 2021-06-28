({
	LoadSessionData : function(component) {
		
	},

	AddQuestionAnswer : function(component, questionAnswer){

		let currentQAList = component.get("CurrentQAList");
		currentQAList.add(questionAnswer);
		component.set("CurrentQAList", currentQAList);
		
	}
})