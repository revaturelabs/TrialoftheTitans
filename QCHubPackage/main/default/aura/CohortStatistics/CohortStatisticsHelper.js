({
    renderChart : function( component, data ) {
        var svg = d3.select("svg"),
            width = +svg.attr("width"),
            height = +svg.attr("height"),
            radius = Math.min(width, height) / 2,
            g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
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

        var action = component.get("c.getData");

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                let data = response.getReturnValue();
                console.log(data);
                // Render the returned data as a pie chart
                //return data;
            }
            else if(state === "ERROR") {
                let errors = response.getError();
                let showToast = $A.get("e.force:showToast");
                if (errors) {
                    showToast.setParams({
                        "title": "ERROR",
                        "message": errors[0].message
                    })
                    showToast.fire();
                }
                else {
                    showToast.setParams({
                        "title": "ERROR",
                        "message": "Unknown error"
                    })
                    showToast.fire();
                }
            }
        },
 
        $A.enqueueAction(action)



        )},
    
    
    FireLaunchInterviewEvent : function(component){
        let liEvent = component.getEvent("LaunchInterviewEvent");
        liEvent.fire();
    }
    
})
