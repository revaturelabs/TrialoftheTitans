({
  ProgressChart : function(component) {   
    var examInfo = component.get("v.contextInfo").userExams;
    var teamColors = [component.get('v.contextInfo').team.Primary_Color__c, component.get('v.contextInfo').team.Secondary_Color__c];
    console.log("Ready to generate chart...");
    console.log(Object.entries(examInfo));

    let data = [];
  

    for(let titan of Object.entries(examInfo)){
      let titanName = titan[0];
      let recentPassedExams = 0;
      let passedExams = 0;
      let progress = 0;
      let recentProgress = 0;
      console.log(titanName);

      for (let exam of titan[1]){
        exam.isPassed ? ( exam.currentResults ? recentPassedExams++ : passedExams++ ): null;
      };

      progress = passedExams/titan[1].length;
      recentProgress = recentPassedExams/titan[1].length;

      let newData = {
        "Titan" : titanName,
        "Value" : progress,
        "RecentProgress": recentProgress,
      }
      data.push(newData);
    }
    
    console.log(data);

    var userColors ={
      "Amplifire":["#ef6363","#c24747"],
      "Alchemy":["#84b059","#539951"],
      "Synergy":["#ffdd00","#fbb034"],
      "Vanquish":["#7aa7e9","#5f70b0"],
    };
    // var data = [
    //     {
    //       "Titan": "Data Model",
    //       "Value": 1,
    //       "RecentProgress": 0
    //     },
    //     {
    //       "Titan": "Security",
    //       "Value": 0.6,
    //       "RecentProgress": .15
    //     },
    //     {
    //       "Titan": "Process Automation",
    //       "Value": 0.3,
    //       "RecentProgress": 0.1
    //     },
    //     {
    //       "Titan": "APEX",
    //       "Value": 1,
    //       "RecentProgress": 0
    //     },
    //     {
    //       "Titan": "Visualforce",
    //       "Value": 0.1,
    //       "RecentProgress": 0.1
    //     },
    //     {
    //       "Titan": "Lightning Components",
    //       "Value": 0.6,
    //       "RecentProgress": 0.2
    //     }
    //   ]

    var margin = {top: 60, right: 60, bottom: 60, left: 60},
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    innerRadius = 20,
    outerRadius = (Math.min(width, height) / 2) -40 ;   // The outerRadius goes from the middle of the SVG area to the border

    // Append the svg object to the body of the page
    var svg = d3.select("#progress-chart")
        .append("svg:svg")
          .attr("viewBox", `0 0 ${width} ${height}`)
          .attr("margin", "30px")
          // .attr("height", height + margin.top + margin.bottom)
          
        .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height/2 +")")
          

        
          

    // X scale
    var x = d3.scaleBand()
        .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
        .align(0)                  // This does nothing ?
        .domain( data.map(function(d) { return d.Titan; }) ); // The domain of the X axis is the list of Titans.

        // console.log("data map")
        // console.log(data.map(function(d) { return d.Titan; }))

    // Y scale
    var y = d3.scaleRadial()
        .range([innerRadius, outerRadius])   // Domain will be define later.
        .domain([0, 1]); // Domain of Y is from 0 to the max seen in the data

    var z = d3.scaleOrdinal()
        .range(teamColors) // Range of Z is the colors each section or the arc will be assigned
        .domain(["Value", "RecentProgress"]); // Domain of Z is the data key of the sections each arc is divided into
    
    console.log(data.map(function(d){return [d.Value, d.RecentProgress]}))
    
    svg.append("circle")
          .attr("fill", "#29292A")
          .attr("stroke-width", "2%")
          .attr("r", y);
    
    // Add bars
    svg.append("g")
      .selectAll("g")
      .data(d3.stack().keys(["Value", "RecentProgress"])(data))
      .enter().append("g")
        .attr("background-color", "#29292A")
        .attr("fill", function(d) { return z(d.key); })
        .attr("class", function(d) { 
          var color = z(d.key);
          return (color == "#98abc5") ? "progress-slice" 
          : "recent-slice" })
      .selectAll("path")
      .data(function(d) { return d; })
      .enter().append("path")
        .attr("d", d3.arc()
            .innerRadius(function(d) { console.log(data.indexOf(d.data)); return y(d[0]); })
            .outerRadius(function(d) { return y(d[1]); })
            .startAngle(function(d) { return x(d.data.Titan); })
            .endAngle(function(d) { return x(d.data.Titan) + x.bandwidth(); })
            .padAngle(0.01)
            .padRadius(innerRadius))
          .attr("id", function(d){
            return "chart-section-" + data.indexOf(d.data)})
          .attr("style", function(d){
              return "animation-delay: " + (data.indexOf(d.data)*0.1)+ "s"});
        // .attr("stroke", '#ffffff');
    
    // Add slice borders
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
        .attr("stroke", "#d4d5d5")
        .attr("stroke-width", "1%");
        
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
          .attr("stroke", "#d4d5d5")
          .attr("stroke-width", "1%")
          .attr("r", y);
    
      

  }
})