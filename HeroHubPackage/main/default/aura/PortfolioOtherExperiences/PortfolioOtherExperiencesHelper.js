({
    doGetExperiences : function(cmp){
        let action = cmp.get('c.getExperiences');
        action.setCallback(this, function(response){
            if(response.getState()==='SUCCESS'){
                console.log('action fired');
                cmp.set('v.Experiences', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    }
})