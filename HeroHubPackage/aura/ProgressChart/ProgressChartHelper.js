({
  ProgressChart : function(component, data) {   
    var data = [
        {
          "Titan": "Data Model",
          "Value": 1,
          "RecentProgress": 0
        },
        {
          "Titan": "Security",
          "Value": 0.6,
          "RecentProgress": .15
        },
        {
          "Titan": "Process Automation",
          "Value": 0.3,
          "RecentProgress": 0.1
        },
        {
          "Titan": "APEX",
          "Value": 1,
          "RecentProgress": 0
        },
        {
          "Titan": "Visualforce",
          "Value": 0.1,
          "RecentProgress": 0.1
        },
        {
          "Titan": "Lightning Components",
          "Value": 0.6,
          "RecentProgress": 0.2
        }
      ]

    var margin = {top: 30, right: 30, bottom: 30, left: 30},
    width = 500 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom,
    innerRadius = 20,
    outerRadius = (Math.min(width, height) / 2) -40 ;   // The outerRadius goes from the middle of the SVG area to the border

    // Append the svg object to the body of the page
    var svg = d3.select("#progress-chart")
        .append("svg:svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          
        .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height/2 +")")
          .attr("margin", 100); // Add 100 on Y translation, cause upper bars are longer

        console.log(svg)
          

    // X scale
    var x = d3.scaleBand()
        .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
        .align(0)                  // This does nothing ?
        .domain( data.map(function(d) { return d.Titan; }) ); // The domain of the X axis is the list of Titans.

        console.log("data map")
        console.log(data.map(function(d) { return d.Titan; }))

    // Y scale
    var y = d3.scaleRadial()
        .range([innerRadius, outerRadius])   // Domain will be define later.
        .domain([0, 1]); // Domain of Y is from 0 to the max seen in the data

    var z = d3.scaleOrdinal()
        .range(["#98abc5", "#8a89a6"]) // Range of Z is the colors each section or the arc will be assigned
        .domain(["Value", "RecentProgress"]); // Domain of Z is the data key of the sections each arc is divided into

    console.log(data.map(function(d){return [d.Value, d.RecentProgress]}))


    // Add bars
    svg.append("g")
      .selectAll("g")
      .data(d3.stack().keys(["Value", "RecentProgress"])(data))
      .enter().append("g")
        .attr("fill", function(d) { return z(d.key); })
      .selectAll("path")
      .data(function(d) { return d; })
      .enter().append("path")
        .attr("d", d3.arc()
            .innerRadius(function(d) { return y(d[0]); })
            .outerRadius(function(d) { return y(d[1]); })
            .startAngle(function(d) { return x(d.data.Titan); })
            .endAngle(function(d) { return x(d.data.Titan) + x.bandwidth(); })
            .padAngle(0.01)
            .padRadius(innerRadius))
        .attr("stroke", '#ffffff');

    svg.append("g")
      .selectAll("path")
      .data(data)
      .enter().append("path")
        .attr("d", d3.arc()
            .innerRadius(function(d) { return y(0); })
            .outerRadius(function(d) { return y(1); })
            .startAngle(function(data) { return x(data.Titan); })
            .endAngle(function(data) { return x(data.Titan) + x.bandwidth(); })
            .padAngle(0.01)
            .padRadius(innerRadius))
        .attr("fill", "none")
        .attr("stroke", '#000000');
    // Border Rings
        var label = svg.append("g")
        .selectAll("g")
        .data(data)
        .enter().append("g")
          .attr("text-anchor", "middle")
          .attr("transform", function(d) { return "rotate(" + ((x(d.Titan) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")translate(" + outerRadius + ",0)"; });
    
      label.append("text") 
          .attr("transform", function(d) { 
            // Math is happening 
            // Send help
            return (x(d.Titan) + x.bandwidth() / 2 + Math.PI / 2) % 
            (2 * Math.PI) < Math.PI ? 
            "rotate(90)translate(0,-16)" : 
            "rotate(-90)translate(0,25)"; })
          .text(function(d) { return d.Titan; });
    
      var yAxis = svg.append("g")
          .attr("text-anchor", "middle");
    
      var yTick = yAxis
        .selectAll("g")
        .data(y.ticks(1).slice(1)) // Set the number of rings
        .enter().append("g");
    
      yTick.append("circle")
          .attr("fill", "none")
          .attr("stroke", "#000")
          .attr("r", y);
    
      

  }
})
