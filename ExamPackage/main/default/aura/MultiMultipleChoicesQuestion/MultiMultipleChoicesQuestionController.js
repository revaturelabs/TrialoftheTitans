({
	fetchMultiChoices : function(component, event, helper) {
		helper.fetchMultiChoices(component);
	},
    handleChange: function (component, event) {
        //alert(event.getParam('value'));
    },
    answer : function(cmp) {
        
        var answer = cmp.find("input").get("v.value");
        return answer;
    }
})