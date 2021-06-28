/////////////////////////////////////////////////////
//
//  Name: CohortPageContainer
//  Author: Kameron Fincher
//  Description: Main controller for the cohort page main 
//	view.  
//	
///////////////////////////////////////////////////
({
	Init : function(component, event, helper) {
		helper.Init(component, event);
	},
    HandleTabClick : function(component, event, helper) {
		helper.HandleTabClick(component, event);
	},
    CreateNewAssessment : function(component, event, helper) {
		helper.CreateNewAssessment(component, event);
	},
    HideNewAssessment : function(component, event, helper) {
		helper.HideNewAssessment(component, event);
	},
    HandleReturnAssessmentIdEvent : function(cmp, event, helper) {
    	helper.HandleReturnAssessmentIdEvent(cmp, event);
    },
    HandleReturnComponentEvent : function(cmp, event, helper) {
        helper.HandleReturnComponentEvent(cmp, event);
    },
    HandleReturnHeroComponentEvent : function(cmp, event, helper) {
        helper.HandleReturnHeroComponentEvent(cmp, event);
    },
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
            width = 240,
            height = 240;
        
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
        
        xScale.domain(data.map(function(d) { return d.year; }));
        yScale.domain([0, d3.max(data, function(d) { return d.value; })]);
        
        g.append("g")
        .attr("transform", "translate(0,"+(height)+")")
        .call(d3.axisBottom(xScale));
        
        g.append("g")
        .call(d3.axisLeft(yScale).tickFormat(function(d){
            return "$" + d;
        }).ticks(10));
        
        
        g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("fill", function(d) {
            if (d.value > 40 ) {
                return "red";
            } else if (d > 10) {
                return "orange";
            }
            return "yellow";
        })
        .attr("x", function(d) { return xScale(d.year); })
        .attr("y", function(d) { return yScale(d.value); })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) { return height - yScale(d.value); });
        
    },
    ScriptsLoaded : function(component, event, helper){
		component.set( "v.scriptsLoaded" , true )
		console.log( "Scripts Loaded" )
		console.log( component.get( "v.scriptsLoaded" ) )
	}
})