/////////////////////////////////////////////////////
// 
//  Name: CurrentCohortAverageController
//  Author: Kameron Fincher
//  Description: Main controller for the current cohort 
//	main view. Display Qc Scores, Exams, and Hero   
//	Assessments
//	
///////////////////////////////////////////////////
({
	Chart : function(component, event, data){
        /*const groupData = [
                 { key:'Visualforce', values:
                                              [
                                                {grpName:'Cohort 1', grpValue:26},
                                                {grpName:'Cohort 2', grpValue:15},
                                                {grpName:'Cohort 3', grpValue:48}
                                              ]
                 },
                 { key: 'Aura', values:
                                              [
                                                {grpName:'Cohort 1', grpValue:14},
                                                {grpName:'Cohort 2', grpValue:23},
                                                {grpName:'Cohort 3', grpValue:5}
                                              ]
                 },
                 { key: 'Sales Cloud', values:
                                              [
                                                {grpName:'Cohort 1', grpValue:32},
                                                {grpName:'Cohort 2', grpValue:9},
                                                {grpName:'Cohort 3', grpValue:25}
                                              ]
                 },
                 { key: 'Automation', values:
                                              [
                                                {grpName:'Cohort 1', grpValue:41},
                                                {grpName:'Cohort 2', grpValue:55},
                                                {grpName:'Cohort 3', grpValue:26}
                                              ]
                 }                            
                  ];

	console.log(groupData);
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    
   
    var x0  = d3.scaleBand().rangeRound([0, width], .5);
    var x1  = d3.scaleBand();
    var y   = d3.scaleLinear().rangeRound([height, 0]);

    var xAxis = d3.axisBottom().scale(x0)
                                .tickValues(groupData.map(d=>d.key));

    var yAxis = d3.axisLeft().scale(y);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    var svg = d3.select('body').append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var categoriesNames = groupData.map(function(d) { return d.key; });
    var rateNames       = groupData[0].values.map(function(d) { return d.grpName; });

    x0.domain(categoriesNames).paddingInner(0.1);
    x1.domain(rateNames).rangeRound([0, x0.bandwidth()]);
    y.domain([0, d3.max(groupData, function(key) { return d3.max(key.values, function(d) { return d.grpValue; }); })]);

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
      .data(groupData)
      .enter().append("g")
      .attr("class", "g")
      .attr("transform",function(d) { return "translate(" + x0(d.key) + ",0)"; });

      slice.selectAll("rect")
      .data(function(d) { return d.values; })
        .enter().append("rect")
            .attr("width", x1.bandwidth())
            .attr("x", function(d) { return x1(d.grpName); })
             .style("fill", function(d) { return color(d.grpName) })
             .attr("y", function(d) { return y(0); })
             .attr("height", function(d) { return height - y(0); })
            .on("mouseover", function(d) {
                d3.select(this).style("fill", d3.rgb(color(d.grpName)).darker(2));
            })
            .on("mouseout", function(d) {
                d3.select(this).style("fill", color(d.grpName));
            });


    slice.selectAll("rect")
      .transition()
      .delay(function (d) {return Math.random()*1000;})
      .duration(1000)
      .attr("y", function(d) { return y(d.grpValue); })
      .attr("height", function(d) { return height - y(d.grpValue); });

      //Legend
  var legend = svg.selectAll(".legend")
      .data(groupData[0].values.map(function(d) { return d.grpName; }).reverse())
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
		*/
		/*
        let dataR = [];
        for(var i = 0;i<5;i++){
            let name = '';
            switch(i){
                case 0: 
                    name = 'Exams'
                    break;
                case 1:
                    name = 'Misc'
                    break;
                    case 2:
                    name = 'Project'
                    break;
            }
            let dog = {    
                year : name,
                value : 70+i,
            }
            
            dataR.push(dog);
            
            console.log(dataR.map(function(d){return [d.year, d.value]}))
        }*/
        
        var margin = 5,
            width = 700,
            height = 500;
        var svg = d3.select("#svg")
        .append("svg:svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${width+30} ${height+50}`)
        .attr("margin", margin)
        
        var xScale = d3.scaleBand().range([0, width]).padding(0.5),
            yScale = d3.scaleLinear().range([height, 0]);
        
        var g = svg.append("g")
        .attr("transform", "translate(" + 30 + "," + 30 + ")");
        
        xScale.domain(data.map(function(d) { return d.name; }));
        yScale.domain([0, d3.max(data, function(d) { return d.value; })]);
        
        g.append("g")
        .attr("transform", "translate(0,"+(height)+")")
        .call(d3.axisBottom(xScale));
        
        g.append("g")
        .call(d3.axisLeft(yScale).tickFormat(function(d){
            return d + "%";
        }).ticks(10));
        
		var helper = this;
        g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("fill", function(d) {
            return helper.RetColor(d.name);
        })
        .attr("x", function(d) { return xScale(d.name); })
        .attr("y", function(d) { return yScale(d.value); })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) { return height - yScale(d.value); })
        .attr("id", function(d, i) {
            return i;
        })
        .on("mouseover", function(d) {
            d3.select(this)
            	.attr("fill", function(d) {
                	return d3.rgb(helper.RetColor(d.name)).darker(2);
            	});
        })
        .on("mouseout", function(d) {
            d3.select(this).attr("fill", function(d) {
                return helper.RetColor(d.name);
            });
        }).append("title")
        .text(function(d) {
            return d.value+"%";
        });
    },
    RetColor : function(name){
    	switch (name){
            case 'Exams':
                return "red";
                break;
            case 'Misc':
                return "blue";
                break;
            case '1-on-1':
                return "green";
                break;
            case 'Project':
                return "orange";
                break;
            case 'QC':
                return "purple";
                break;    
            default:
                return "orange";
        }
 	}
})