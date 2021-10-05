import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getData from '@salesforce/apex/QCHubController.getData';

export default class LwcCohortStatistics extends LightningElement {
    
    
    //cohort__c 
    @api
    ActiveCohort;

    LaunchEvent (){
        this.dispatchEvent(new CustomEvent("LaunchInterviewEvent")); // IDK if this works
    }
    
    connectedCallback() {
        this.ExtractCohortData();
    }

    Chart(){
        console.log("Chart ...")
        let data = [];
        for(var i = 0;i<5;i++){
        
                    let dog = { // i'm thinking dog means Date Of ... Gunna document this?nah I'm sure EVERYONE will just intuitivly understand my acronym
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

        console.log("End Chart")
    }
    
    renderChart() {
        console.log("rendering Chart...")
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
        console.log("Chart Rendered")
    }

    ExtractCohortData() {
        console.log("Extracting Data...");
        getData()
        .then(result => {
            this.ActiveCohort = result;
            this.error = undefined;
        })
        .catch(error => {
            this.error = error;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error while getting Data', 
                    message: error.message, 
                    variant: 'error'
                }),
            );
            this.ActiveCohort = undefined;
        });   
        console.log("Data Extracted");
    }     
}