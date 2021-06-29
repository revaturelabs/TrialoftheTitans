({
	LoadSessionData : function(component) {
		
	},

	AddQuestionAnswer : function(component, questionAnswer){
		let currentQAList = component.get("v.CurrentQAList");
		currentQAList.push(questionAnswer);
		component.set("v.CurrentQAList", currentQAList);
	
	}
})