({
    Chart : function(component, event, helper){
        let data = [];
        for(var i = 0;i<5;i++){
        
                    let dog = {
                        year : 2000+i,
                        value : 40+i,
                    }

                    data.push(dog);

                    console.log(data.map(function(d){return [d.year, d.value]}))
                    
        }

        var margin = 5,
        width = 120,
        height = 120;

        var svg = d3.select("#svg")
        .append("svg:svg")
        .attr("width", width)
        .attr("height", height)
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
        helper.FireLaunchInterviewEvent(component);
    }

})