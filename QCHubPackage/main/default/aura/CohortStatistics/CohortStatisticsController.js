({
    initD3Charts : function(component, event, helper) {

            // probably remove this function
    },


    Chart : function(component, event, helper){
        //*  // remove one of the slashes here to comment out the data maker
        // this is a datafactory we'll replace it with a call to our apex controller to get the data
        let data = [];
        for(var i = 0;i<5;i++){
        
                    let dog = {
                        year : 2000+i,
                        value : 40+i,
                    }

                    data.push(dog);

                    console.log(data.map(function(d){return [d.year, d.value]}))
                    
        }
        //*/

        // apex controller data call
        //let data2 = helper.ExtractCohortData();
        //console.log(data2);

        var margin = 5,
        width = 120,
        height = 120;

        // this is the window through which we view the chart, in theory it can be moved with css
        var svg = d3.select("#svg")
        .append("svg:svg")
          // width and hieght are the size of the window through which we view the graph
        .attr("width", width)
        .attr("height", height)
          // this viewbox attribute controls the size of the graph with in size we set for the svg tag, 
          // essentially this is the graph scale
          //.attr("viewBox", 0, 0, 0, 0, 0)
        
        .attr("margin", margin)

      

        var xScale = d3.scaleBand().range([0, width]).padding(0.5),
            yScale = d3.scaleLinear().range([height, 0]);

        var g = svg.append("g")
        .attr("transform", "translate(" + 30 + "," + 10 + ")");

        xScale.domain(data.map(function(d) { return d.year; }));
        yScale.domain([0, d3.max(data, function(d) { return d.value; })]);

        g.append("g")
        .attr("transform", "translate(0," + -1*height + ")")
        .call(d3.axisBottom(xScale));

        g.append("g")
        .call(d3.axisLeft(yScale).tickFormat(function(d){
            return "$" + d;
        }).ticks(10));


        g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return xScale(d.year); })
        .attr("y", function(d) { return yScale(d.value); })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) { return height - yScale(d.value); });

    },


    LaunchEvent : function (component, event, helper){

        console.log("Button clicked?");
        helper.FireLaunchInterviewEvent(component);

    }

})