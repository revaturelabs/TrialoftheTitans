import { LightningElement } from 'lwc';
import getDataMap from '@salesforce/apex/D3GrpChartController.getDataMap';
import { loadScript } from 'lightning/platformResourceLoader';
import D3 from '@salesforce/resourceUrl/d3';

export default class HeroGroupchartLWC extends LightningElement {

    svgWidth = 400;
    svgHeight = 400;
    d3Initialized = false;

    renderedCallback() {
        if (this.d3Initialized) {
            return;
        }
        this.d3Initialized = true;

        Promise.all([
            loadScript(this, D3 + '/d3.js')
        ])
            .then(() => {
                console.log('loaded d3?');
                getDataMap()
                    .then(result => {
                        // Render the returned data as a Bar chart
                        const data = JSON.stringify(result);
                        this.renderChart( data );
                    })
                    .catch(error => {
                        console.log('error: ', error);
                    });
            })
            .catch(error => {
                console.log('error: ', error);
            });
    }

    renderChart(data) {
        var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 800 - margin.left - margin.right,
            height = 250 - margin.top - margin.bottom;


        var x0  = d3.scaleBand().rangeRound([0, width], .5);
        var x1  = d3.scaleBand();
        var y   = d3.scaleLinear().rangeRound([height, 0]);
        //console.log(data);
        let parsedData = JSON.parse(data)
        const result=[];
        for(let element in parsedData) result.push([element, parsedData[element]])
        // console.log(result);
        const result1=Object.keys(parsedData).map(key=>[key, parsedData[key]]);
        // console.log(result1);
        var xAxis = d3.axisBottom().scale(x0).tickValues(result.map(d=>d[0]));
        //.tickFormat(d3.timeFormat("Month %b"))
      
        
        var yAxis = d3.axisLeft().scale(y);
        
        const color = d3.scaleOrdinal(d3.schemeCategory10);
        const svg = d3.select(this.template.querySelector('svg.d3'))
        .append("svg:svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${width+30} ${height+50}`)
        .attr("margin", margin)

        this.svgWidth = width;
        this.svgHeight = height;
        
        var g = svg.append("g")
        .attr("transform", "translate(" + 30 + "," + 30 + ")");
       
        var categoriesNames = result.map(function(d) { return d[0]; });
        // console.log(categoriesNames);
        var rateNames = result[0][1].map(function(d) { return d.grpName; }); //*need update grpName//
		// console.log(rateNames);
        x0.domain(categoriesNames).paddingInner(0.1);
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
        .attr("width", x1.bandwidth()/2)
        .attr("x", function(d) { return x1(d.grpName); })
        .style("fill", function(d) {return color(d.grpName) })
        .attr("y", function(d) { return y(0); })
        .attr("transform",function(d) { return "translate(" + x1.bandwidth()/4 + ",0)"; })
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
    }
}