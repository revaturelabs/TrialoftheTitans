({
    /*doGetExperiences() gets the Id of the current user invoking this method, then passes it to the controller method
     getExperiences(), which is used to query for experiences the user has.
     cmp : component passed in from the JavaScript controller*/
    doGetExperiences : function(cmp){
        var action = cmp.get('c.getExperiences');
        action.setCallback(this, function(response){
            if(response.getState()==='SUCCESS'){
                const returnValues = response.getReturnValue();

                console.log(returnValues);

                cmp.set('v.Experiences', returnValues);
                cmp.set('v.ExperienceList', returnValues);
                
            }
        });
        $A.enqueueAction(action);
    },

    saveExperience : function(cmp, values){
        console.log(values);
        
        var action = cmp.get('c.updateExperiences');
        action.setParam({'experiences' : values});
        action.setCallback(this, function(response){
            if(response.getState() === 'SUCCESS'){
                cmp.set('v.draftValues', []);
            }
        });
        $A.enqueueAction(action);
    }
})