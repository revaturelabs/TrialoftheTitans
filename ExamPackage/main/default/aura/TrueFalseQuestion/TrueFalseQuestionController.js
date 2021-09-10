({
	fetchTrueFalse : function(component, event, helper) {
		helper.fetchTrueFalse(component);
	},
	answer : function(cmp) {
        
        var answer = cmp.find("input").get("v.value");
        return answer;
    }
})