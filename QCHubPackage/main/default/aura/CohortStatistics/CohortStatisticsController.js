({
    initD3Charts : function(component, event, helper) {

        var width = 960;
        var height = 500;
 
        // Create SVG element, we can't just use tag in lightning component
        // So creating one dynamically using jquery
        var svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);    
 
        // Calling server-action to get the data
        var action = component.get("c.getData");
 
        // Create a callback that is executed after
        // the server-side action returns
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                let data = response.getReturnValue();
                console.log(data);
                // Render the returned data as a pie chart
                helper.renderChart( component, data );
            }
            else if(state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " +
                                    errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        },
 
        $A.enqueueAction(action)
 
    )}

})
