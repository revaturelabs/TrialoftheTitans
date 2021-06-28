({
    OnInit : function(component, event, helper){

        helper.getAllData(component, event, helper);
        //helper.LoadCohorts(component);

    },

    UpdateCohort : function(component, event, helper){
        // Triggered by UpdateCohortEvent
        helper.LoadCohortData(component, event.getParam("SelectedCohort"));
        
    },

    LaunchInterview : function(component, event, helper){

        console.log("liEvent received, launching interview");
        helper.LaunchInterview(component);
    },


    doInit: function( component, event, helper ) {
       
    },
    SelectCohort: function(component, event, helper){
        //console.log("### cmp = "+ component.find("weekComponent"));
        if(component.find("weekComponent") !=null || component.find("weekComponent") != undefined){
            component.find("weekComponent").destroy();
        }else{
            console.log(' Component is already Destroyed ');
        }
        //console.log(event.target.value);
        console.log(event.getSource().get("v.value"));
        var cohortName = event.getSource().get("v.value");
        component.set("v.cohortName", cohortName);
        var heroMap = [];
        var data = component.get("v.data");
        for ( var key in data.mapCohortNameVsWrapper ) {
            if(cohortName == key){
                heroMap.push({value:data.mapCohortNameVsWrapper[key], key:key});
            }
            
        }
        //console.log("### heroMap = "+ JSON.stringify(heroMap));
        component.set("v.heroMap", heroMap)
        $A.createComponent(
            "c:weekDropdown",
            //"c:selectAweek",
            {
                "aura:id": "weekComponent",
                "heroMap": heroMap,
                "weeks" : component.get("v.weeks"),
                "allQuestionDeckWithQuestions" : component.get("v.allQuestionDeckWithQuestions")
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
    }
})