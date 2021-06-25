({
    // used to initialize the hero list of currently selected cohort
    getHeroes : function(component, event) {
        var heroes = component.get("c.getHeroes")
        heroes.setParams({cohort: event.getParam(component.find('cohort').getSelectedRows[0])})

        heroes.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                component.set("v.heroList", response.getReturnValue())
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        })
        $A.enqueueAction(heroes)
    },


    handleRowSelection : function(component, event) {
        
    },
})
