({
    /*doGetExperiences() gets the Id of the current user invoking this method, then passes it to the controller method
     getExperiences(), which takes in an Id parameter userId, used to query for experiences the user has.
     cmp : component passed in from the JavaScript controller*/
    doGetExperiences : function(cmp){
        let action = cmp.get('c.getExperiences');
        action.setCallback(this, function(response){
            if(response.getState()==='SUCCESS'){
                const returnValues = response.getReturnValue();

                cmp.set('v.Experiences', returnValues);
                cmp.set('v.ExperienceList', returnValues);
                cmp.set('v.draftValues', returnValues);
            }
        });
        $A.enqueueAction(action);
    },

    showErrorToast : function(component, event){
        component.find('notifLib').showToast({
            "title": "Something has gone wrong when creating an Experience!",
            "message": event.getParam("message"),
            "variant": "error"
        });
    },

    handleSave : function(cmp, event){
        
    },
})