({
	fetchMultiChoices : function(component, event, helper) {
		helper.fetchMultiChoices(component);
	},
    // returns answer to the examinterview component
    answer : function(cmp) {
        
        var answer = cmp.find("input").get("v.value");
        return answer;
    }
})