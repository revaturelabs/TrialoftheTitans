({
	fetchMultiChoice : function(component, event, helper) {
		helper.fetchMultiChoice(component, event, helper);
	},
	// returns answer to the examinterview component
	answer : function(cmp) {
        
        var answer = cmp.find("input").get("v.value");
        return answer;
    }
})