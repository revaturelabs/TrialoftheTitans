({
    /*doGetExperiences() gets the Id of the current user invoking this method, then passes it to the controller method
     getExperiences(), which is used to query for experiences the user has.
     cmp : component passed in from the JavaScript controller*/
    doGetExperiences : function(cmp){
        var action = cmp.get('c.getExperiences');
        action.setCallback(this, function(response){
            if(response.getState()==='SUCCESS'){
                const returnValues = response.getReturnValue();

                cmp.set('v.Experiences', returnValues);
                cmp.set('v.ExperienceList', returnValues);
                
            }
        });
        $A.enqueueAction(action);
    },

    /* saveExperience() passes draft values into updateExperiences() Apex method and resets draftValues.
    cmp : component
    values : draft values being used to update the experiences from the component. */
    saveExperience : function(cmp, values){
        var action = cmp.get('c.updateExperiences');
        action.setParams({'experiences' : values});
        action.setCallback(this, function(response){
            console.log(response.getState());
            if(response.getState() === 'SUCCESS'){
                cmp.set('v.draftValues', []);
            }else if(response.getState() === 'ERROR'){
                var errors = response.getError();
                console.error(errors);
            }
        });
        $A.enqueueAction(action);
    },

    removeExperience : function(cmp, row){
        var action = cmp.get('c.deleteExperience');
        action.setParams({'experience':row});
        action.setCallback(this, function(response){
            if(response.getState() === 'ERROR'){
                console.error(response.getError());
            }
        });
        $A.enqueueAction(action);
    }
})