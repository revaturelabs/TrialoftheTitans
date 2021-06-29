({
	renderChart: function(component, data) {
        
        var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 800 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;
        var x0  = d3.scaleBand().rangeRound([0, width], .5);
        var x1  = d3.scaleBand();
        var y   = d3.scaleLinear().rangeRound([height, 0]);
        //console.log(data);
        let parsedData = JSON.parse(data)
        const result=[];
        for(let element in parsedData) result.push([element, parsedData[element]])
        console.log(result);
        const result1=Object.keys(parsedData).map(key=>[key, parsedData[key]]);
        console.log(result1);
        var xAxis = d3.axisBottom().scale(x0).tickValues(result.map(d=>d[0]));
        //.tickFormat(d3.timeFormat("Month %b"))
      
        
        var yAxis = d3.axisLeft().scale(y);
        
        const color = d3.scaleOrdinal(d3.schemeCategory10);
        var svg = d3.select('body').append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
       
        var categoriesNames = result.map(function(d) { return d[0]; });
        //console.log(categoriesNames);
        var rateNames = result[0][1].map(function(d) { return d.grpName; }); //*need update grpName//
		//console.log(rateNames);
        x0.domain(categoriesNames);
        x1.domain(rateNames).rangeRound([0, x0.bandwidth()]);                          
        y.domain([0, d3.max(result, function(key) { return d3.max(key[1], function(d) { return d.grpValue; }); })]); //*need update grpName//
        
        svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
        
        svg.append("g")
        .attr("class", "y axis")
        .style('opacity','0')
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style('font-weight','bold')
        .text("Value");

        svg.select('.y').transition().duration(500).delay(1300).style('opacity','1');
        
        var slice = svg.selectAll(".slice")
        .data(result)
        .enter().append("g")
        .attr("class", "g")
        .attr("transform",function(d) { return "translate(" + x0(d[0]) + ",0)"; });
        
        slice.selectAll("rect")
        .data(function(d) { return d[1]; })
        .enter().append("rect")
        .attr("width", x1.bandwidth())
        .attr("x", function(d) { return x1(d.grpName); })
        .style("fill", function(d) {return color(d.grpName) })
        .attr("y", function(d) { return y(0); })
        .attr("height", function(d) { return height - y(0); });
       // .on("mouseover", function(d) {
      //      d3.select(this).style("fill", d3.rgb(color(d.grpName)).darker(2));
       // })
       // .on("mouseout", function(d) {
       //     d3.select(this).style("fill", color(d.grpName));
       // });
        slice.selectAll("rect")
        .transition()
        .delay(function (d) {return Math.random()*1000;})
        .duration(1000)
        .attr("y", function(d) { return y(d.grpValue); })
        .attr("height", function(d) { return height - y(d.grpValue); });
            //Legend
        var legend = svg.selectAll(".legend")
        .data(result[0][1].map(function(d) { return d.grpName; }).reverse())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
        .style("opacity","0");

        legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function(d) { return color(d); });

        legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) {return d; });

        legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");
    }
})