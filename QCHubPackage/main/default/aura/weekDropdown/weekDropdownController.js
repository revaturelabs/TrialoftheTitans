({
    OnInit : function(component, event, helper){

        //helper.getData(component, event, helper);
        helper.populateDefaultWeek(component, event, helper);

    },
     UpdateCohort : function(component, event, helper){
        // Triggered by UpdateCohortEvent
        helper.LoadCohortData(component, event.getParam("SelectedCohort"));
        
    },

    LaunchInterview : function(component, event, helper){

        console.log("liEvent received, launching interview");
        helper.LaunchInterview(component);
    },
    
    onChangeWeek : function(component, event, helper){
        var weekName = component.find('weekSelect').get('v.value');
        console.log("### week Name = "+ weekName);
        component.set("v.weekName", weekName);


    },


    doInit: function( component, event, helper ) {
       
    },
    SelectCohort: function(component, event, helper){
        //console.log(event.target.value);
        console.log(event.getSource().get("v.value"));
        var cohortName = event.getSource().get("v.value");
        var heroMap = [];
        var data = component.get("v.data");
        for ( var key in data.mapCohortNameVsWrapper ) {
            if(cohortName == key){
                heroMap.push({value:data.mapCohortNameVsWrapper[key], key:key});
            }
            
        }
        //console.log("### heroMap = "+ JSON.stringify(heroMap));
        component.set("v.heroMap", heroMap)
    }
})