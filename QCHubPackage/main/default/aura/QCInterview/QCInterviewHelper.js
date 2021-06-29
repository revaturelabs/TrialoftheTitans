({
	LoadSessionData : function(component) {
		
	},

	AddQuestionAnswer : function(component, questionAnswer){

		let currentQAList = component.get("CurrentQAList");
		currentQAList.push(questionAnswer);
		component.set("CurrentQAList", currentQAList);
		
	}
})