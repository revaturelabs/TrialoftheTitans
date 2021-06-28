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
})