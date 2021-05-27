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
        
        for(let Titan in titanList){
            let selectedTitan = titanList[Titan].Id;
            console.log('Selected Titan Id:' + selectedTitan);            
            let titanDiv = document.getElementById(selectedTitan);
            console.log('titanDiv:' + titanDiv);
            $A.util.addClass(titanDiv, "toggle-hide");
        }
        let titanId = event.currentTarget.dataset.titan;
        console.log('Current Titan Id:' + titanId);
        let titanDiv = document.querySelector("#" + titanId);
		$A.util.removeClass(titanDiv, "toggle-hide");
        /*
            var evt = component.getEvent("TitanPageLandingEvent");
            evt.setParams({ "eCandidateID" : hCandidateID
                          });
            evt.fire(); 
            */
        
        //          for(let i=0; i<divList.length; i++){
        //                let displayDiv = divList[i];                
        //            };
        
        /*
            var navTo = event.getParam("activeTitan");
            console.log("Event Received");
            
            console.log('this function should fire event with the id of the div to be displayed');
            console.log('the receiving function should get that id and remove hiding');
            
            var displayDiv = component.find("titanDiv1");
            $A.util.removeClass(displayDiv,"toggle-hide");
            */
        
        
        
    }
})