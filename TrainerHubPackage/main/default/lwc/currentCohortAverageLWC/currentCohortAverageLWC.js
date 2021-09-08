import { LightningElement, wire, track } from 'lwc';
import getData from '@salesforce/apex/CurrentCohortController.getData';
export default class CurrentCohortAverageLWC extends LightningElement {
    @wire(getData)
    getData;
    @track pr;
    @track error;
    connectedCallback(){
        getData().then(result=>{console.log('result' + result); this.pr = result; this.Chart(this.pr)}).catch(error=>{console.log('error ' + error); this.error = error;});
    }
    
    //fn(getData){this.Chart(getData);}
    
    Chart(data){
        var margin = 5,
        width = 700,
        height = 315;
        var svg = d3.select("#svg")
        .append("svg:svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${width+30} ${height+50}`)
        .attr("margin", margin);
    
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
        
        g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("fill", function(d) {
            return this.RetColor(d.name);
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
                    return d3.rgb(this.RetColor(d.name)).darker(2);
                });
        })
        .on("mouseout", function(d) {
            d3.select(this).attr("fill", function(d) {
                return this.RetColor(d.name);
            });
        }).append("title")
        .text(function(d) {
            return d.value+"%";
        });
    }
    RetColor(name){
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
}