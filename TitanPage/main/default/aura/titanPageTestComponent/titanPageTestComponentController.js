({
    doInit : function(component, event, helper) {
        let titanList = component.get("c.getTitans");
        titanList.setCallback(this, function(response){
            if(response.getState() == "SUCCESS"){
                component.set("v.TitanList", response.getReturnValue());
                console.log("Returned: ")
                console.log(response.getReturnValue())
            }
        })
        $A.enqueueAction(titanList);
    }
    
})