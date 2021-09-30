({
    fetchMultiChoice : function(component, event, helper) {
        var options = component.get("v.radioGroupOptions");
        var options = options.split('||');
        let optionsArray = [];
        for (let i = 0; i< options.length; i++) {
            let myObject = {
                'label': `${options[i]}`,
                'value': `${options[i]}`
            };
            optionsArray.push(myObject)
        }
        component.set('v.radioGroupOptions', optionsArray)
    }
})