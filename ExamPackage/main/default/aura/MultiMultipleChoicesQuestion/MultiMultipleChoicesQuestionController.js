({
	fetchMultiChoices : function(component, event, helper) {
		helper.fetchMultiChoices(component);
	},
    handleChange: function (component, event) {
        alert(event.getParam('value'));
    },
})