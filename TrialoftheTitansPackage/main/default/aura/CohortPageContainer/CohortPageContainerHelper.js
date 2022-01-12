/////////////////////////////////////////////////////
// 
//  Name: CohortPageContainer
//  Author: Kameron Fincher
//  Description: Main helper for the cohort page main 
//	view.  
//	
///////////////////////////////////////////////////
({
    // Init(): initializes titan
	Init : function(component, event) {
		let tabs = [];
        let titan = null;
        for(let i = 1;i<9;i++){
            switch(i){
                case 1:
                    titan = {name:"Hero List"};
                    break;    
                case 2:
                    titan = {name:"General Assessments"};
                    break;
                case 3:
                    titan = {name:"Hero Assessments"};
                    break;
                case 4:
                    titan = {name:"Exam List"};
                    break;
                case 5:
                    titan = {name:"Coding Assessments"};
                    break;
                case 6:
                    titan = {name:"One-on-One"};
                    break; 
                case 7:
                    titan = {name:"QC Scores"};
                    break;    
                case 8:
                    titan = {name:"Exam Assignments"};
                    break; 
                default:
                    titan = {name:"View "+i};
            }
            titan.state = "Blank"; //state:"Blank",index:i,buttonDisabled:false
            titan.index = i;
            titan.buttonDisabled = false;
            tabs.push(titan);
        }
        component.set( "v.currIndex", 0);               
        component.set( "v.tabs", tabs);
	},
    SetExamLink : function(component, event) {
        let action = component.get('c.returnDomain');
        let help = this;
        action.setCallback(this, (function (response) {
            if (response.getState() === "SUCCESS") {
                var data = response.getReturnValue();
                component.set("v.examURL", data);
                
            } 
        }));
        $A.enqueueAction(action);
          
    },
    ToExamHub : function(component, event) {
        let url = component.get('v.examURL');
        window.open(url, '_blank');
    },
    // HandleTabClick(): handles the event of a different tab being clicked
    HandleTabClick : function( component, event){
        let currentTitan = event.getParam("titan")
        this.HideNewAssessment(component, event);
        let titan = component.get('v.tabs');
        component.set("v.currIndex", titan.map(e => e.name).indexOf(currentTitan))
        component.set("v.active", currentTitan);
    },
    CreateNewAssessment : function(component, event){
       this.ToggleNewAssessment(component, event, 'Create New')
    },
    HideNewAssessment : function(component, event){
       this.ToggleNewAssessment(component, event, 'Blank')
    },
    ToggleNewAssessment : function(component, event, state){
        let titan = component.get('v.tabs');
       	let index = component.get('v.currIndex');

        titan[index].state=state;
        titan[index].buttonDisabled = (state == 'Create New');
        component.set('v.tabs',titan);
    },
    HandleReturnAssessmentIdEvent : function(cmp, event) {
        let eventReturnedId = event.getParam("AssessmentId");
        // set the handler attributes based on event data
        cmp.set("v.AssessmentId", eventReturnedId);
        this.ToggleNewAssessment(cmp, event, 'View Details');
    },
    HandleReturnComponentEvent : function(cmp, event) {
        this.ToggleNewAssessment(cmp, event, 'Blank');
		this.FetchData(cmp,event,'assessmentList');
    },
    HandleReturnHeroComponentEvent : function(cmp, event) {
        this.ToggleNewAssessment(cmp, event, 'Blank');
		this.FetchData(cmp,event,'assessmentHeroList');
    },
    FetchData : function(cmp, event, cmpName) {
        let assessmentList = cmp.find(cmpName);     
        assessmentList[0].FetchData();
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
        let margin = 5,
            width = 240,
            height = 240;
        
        let svg = d3.select("#svg")
        .append("svg:svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${width+30} ${height+50}`)
        .attr("margin", margin)
        
        let xScale = d3.scaleBand().range([0, width]).padding(0.5),
            yScale = d3.scaleLinear().range([height, 0]);
        
        let g = svg.append("g")
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
	},
    getCohorts : function(component){
        let action = component.get('c.returnCohorts');
        action.setCallback(this, (function (response) {
            if (response.getState() === "SUCCESS") {
                var cohorts = response.getReturnValue();
                component.set("v.cohortList", cohorts);
                component.set("v.CohortId", cohorts[0].Id);
            } 
        }));
        $A.enqueueAction(action);
    },
    setCohort : function(component, event){
        let cohort = component.find("selectCohort").get("v.value");
        component.set("v.CohortId", cohort);
    }
})