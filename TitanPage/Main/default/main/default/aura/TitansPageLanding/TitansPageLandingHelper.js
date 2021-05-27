({   
    hSetTitans : function(component, event, helper) {
        let titanList = component.get("c.getTitans");
        titanList.setCallback(this, function(response){
            if(response.getState() == "SUCCESS"){
                component.set("v.TitanList", response.getReturnValue());
                console.log("Returned Titans: ")
                console.log(response.getReturnValue())
            }
        })
        $A.enqueueAction(titanList);
    },
    
//	hShowTitan# : button method that fires event, chooses which Titan to display info for 
    hShowTitan1 : function(component, event, helper) {
        var TitanPageLandingEvent = component.getEvent("TitanPageLandingEvent");
        TitanPageLandingEvent.setParams({
            "activeTitan" : "titanDiv1",
        });
        TitanPageLandingEvent.fire();
        console.log("TitanPageLandingEvent fired: titanDiv1")
    },
    
//	hNavigate : uses switch statement to show the Titan according to hShowTitan# method
    hNavigate : function(component, event, helper) {
        console.log("hNavigate function:");
        var titanList = component.get("v.TitanList");
        console.log(titanList);
        
        for(let i=0; i<titanList.length; i++){
            let titanDiv = document.querySelector("#titanDiv-"+i);
			$A.util.addClass(titanDiv,"toggle-hide");
            
//          for(let i=0; i<divList.length; i++){
//                let displayDiv = divList[i];                
//            };
            
            var navTo = event.getParam("activeTitan");
            console.log("Event Received");
            
            switch (navTo){
                case "titanDiv1":
                    var displayDiv = component.find("titanDiv1");
                    $A.util.removeClass(displayDiv,"toggle-hide");
                    break;
            }
        }
    }
})