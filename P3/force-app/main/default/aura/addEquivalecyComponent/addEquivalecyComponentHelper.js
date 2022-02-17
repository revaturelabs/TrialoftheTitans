({
 doInit : function(component, event){
    	//populate skills list
    	let sListAction = component.get("c.getSkills");
        sListAction.setCallback(this, function(response){
            let state = response.getState();
            if(state == 'SUCCESS'){
                component.set("v.skillList", response.getReturnValue());
            }
        });
        $A.enqueueAction(sListAction);
    },
})