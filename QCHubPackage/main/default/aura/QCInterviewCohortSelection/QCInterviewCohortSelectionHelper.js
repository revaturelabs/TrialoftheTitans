({
    // used to initialize the hero list of currently selected cohort
    getHeroes : function(component, event) {
        var heroes = component.get("c.getHeroes")
        //this needs updated once I find out how to access selected cohort
        heroes.setParams({cohort: component.find('cohort').getSelectedRows[0]}) 

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

    // used to initialize a list of finalized interviews pertaining to this cohort week (pull from event attribute)
    getHeroes : function(component, event) {
        var int = component.get("c.getInterviews")
        int.setParams({heroes: component.get("v.heroList")}) 

        int.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                component.set("v.heroList", response.getReturnValue())
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        })
        $A.enqueueAction(heroes)

    },

    // handles selection of hero and start of interview, 
    // which is to select and load the next component and pass in the hero selection
    handleRowSelection : function(component, event) {
    },
})
