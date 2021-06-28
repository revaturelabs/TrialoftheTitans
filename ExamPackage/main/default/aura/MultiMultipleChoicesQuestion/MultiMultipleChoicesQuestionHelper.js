({
	fetchMultiChoices : function(component) {
		var action = component.get('c.fetchMultiMultiple');
        
        action.setCallback(this, (function(response) {
            var status = response.getState();
            if (status === "SUCCESS"){
                var holder = response.getReturnValue();
                var choiceList = [];
                console.log(holder);
                component.set('v.question', holder);
                var options = holder.Options__c.split('||');
                let optionsArray = [];
                for (let i = 0; i< options.length; i++) {
					let myObject = {
                        'label': `${options[i]}`,
                        'value': `${options[i]}`
               		};
                	optionsArray.push(myObject)
                }
                component.set('v.checkGroupOptions', optionsArray)
                console.log(options);
                choiceList.push(holder);
                component.set('v.options', choiceList);
            }    
            else if(status === "INCOMPLETE"){
            	console.log("Server is not responding!");
            }
            else if(status === "ERROR"){
            	console.log("ERROR: " + errorMessage);
            }
            
            
    }));
        $A.enqueueAction(action);
	}
})