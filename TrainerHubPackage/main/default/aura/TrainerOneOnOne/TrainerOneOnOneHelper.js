({
    getRecordId : function(component) {
        let trainerId = $A.get("$SObjectType.CurrentUser.Id");
        console.log(trainerId);
        let getMethod = component.get('c.getOneOnOneId')
        getMethod.setParams({trainerId : trainerId})
        getMethod.setCallback(this, function (response) {
            let state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.OneOnOneId',response.getReturnValue());
            }
        })
        $A.enqueueAction(getMethod); 
    }
})
