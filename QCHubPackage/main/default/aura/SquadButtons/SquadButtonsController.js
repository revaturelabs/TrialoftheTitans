({
    RenTest : function(component, event, helper) {
        if (component.get("v.ActiveCohort") != null){
            console.log("in RenTest");
            let test = component.get("v.ActiveCohort");
            console.log(test.squadList);
            console.log("Name:");
            console.log(test.squadList[0].squad.Name);
        }
    }
})
