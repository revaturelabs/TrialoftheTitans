({
    renderChart : function( component, data ) {
        var svg = d3.select("svg"),
            width = +svg.attr("width"),
            height = +svg.attr("height"),
            radius = Math.min(width, height) / 2,
            g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
            console.log("ahoy");
            console.log(svg);
        var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
 
        var pie = d3.pie()
        .sort(null)
        .value(function(d) { return d.curriculum; });
 
        var path = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);
 
        var label = d3.arc()
        .outerRadius(radius - 80)
        .innerRadius(radius - 80);
 
        var arc = g.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");
 
        arc.append("path")
        .attr("d", path)
        .attr("fill", function(d) { return color(d.data.name); });
 
        arc.append("text")
        .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
        .attr("dy", "0.35em")
        .text(function(d) { return d.data.name; });
    },

    ExtractCohortData : function( component) {

        
        
        
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
                //return data;
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
