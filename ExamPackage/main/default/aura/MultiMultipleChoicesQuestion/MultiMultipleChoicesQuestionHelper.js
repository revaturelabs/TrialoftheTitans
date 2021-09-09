({
	fetchMultiChoices : function(component) {
        var options = component.get("v.checkGroupOptions");
        //component.set("v.radioGroupOptions", options);
        var options = options.split('||');
        let optionsArray = [];
        for (let i = 0; i< options.length; i++) {
            let myObject = {
                'label': `${options[i]}`,
                'value': `${options[i]}`
            };
            optionsArray.push(myObject);
        }
        component.set('v.checkGroupOptions', optionsArray);
    }
})