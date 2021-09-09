({
    /*doGetExperiences() gets the Id of the current user invoking this method, then passes it to the controller method
     getExperiences(), which takes in an Id parameter userId, used to query for experiences the user has.
     cmp : component passed in from the JavaScript controller*/
    doGetExperiences : function(cmp){
        const id = $A.get('$SObjectType.CurrentUser.Id');

        let action = cmp.get('c.getExperiences');
        action.setParams({
            "userId" : id
        });
        action.setCallback(this, function(response){
            if(response.getState()==='SUCCESS'){
                console.log('action fired');
                cmp.set('v.Experiences', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    }
})