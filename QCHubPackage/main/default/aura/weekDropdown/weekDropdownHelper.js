({
    getData : function(component, event, helper){
        var data = component.get("v.data");
        console.log("### data = "+ JSON.stringify(data));
        if(data != null){
           var cohortName = component.get("v.cohortName");
            var heroMap = [];
            
            for ( var key in data.mapCohortNameVsWrapper ) {
                if(cohortName == key){
                    heroMap.push({value:data.mapCohortNameVsWrapper[key], key:key});
                }
                
            }
            console.log("### heroMap = "+ JSON.stringify(heroMap));
            component.set("v.heroMap", heroMap) 
        }
        
        
    },

    populateDefaultWeek : function(component, event, helper){
        var weeks = component.get("v.weeks");
        if(weeks != null){
            component.set("v.weekName", weeks[0]);
        }
    },

   /* createQCQuestionAnswer : function(component, event, helper){
        //console.log("### cmp = "+ component.find("weekComponent"));
        if(component.find("qccmp") !=null || component.find("qccmp") != undefined){
            component.find("qccmp").destroy();
        }else{
            console.log(' Component is already Destroyed ');
        }

        $A.createComponent(
            "c:weekDropdown",
            //"c:selectAweek",
            {
                "aura:id": "qccmp",
                "weekName": component.get("v.weekName"),
                "qcInterviewId" : component.get("v.weeks")
            },
            function(bodyCmp, status, errorMessage){
                //Add the new button to the body array
                if (status === "SUCCESS") {
                    var body = component.get("v.body");
                    body.push(bodyCmp);
                    component.set("v.body", body);
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.")
                    // Show offline error
                }
                else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                    // Show error message
                }
            }
        );
    }*/
})