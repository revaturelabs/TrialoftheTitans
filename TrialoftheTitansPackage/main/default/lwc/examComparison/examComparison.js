import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { loadScript } from 'lightning/platformResourceLoader';
import D3 from "@salesforce/resourceUrl/DJS3";
import RecentExamResults from '@salesforce/apex/ExamComparisonController.RecentExamResults';


export default class ExamComparison extends LightningElement {
    d3Init = false;
    recentExams;
    error;

    @wire(RecentExamResults, {TitanId: 'a0X3F000006XBL1UAO'})
    RecentExamResults({data, error}){
        if(data) {
            this.recentExams = data;
            this.error = undefined;
        }
        else if (error) {
            this.recentExams = undefined;
            this.error = error;
        }
    }

    renderedCallback(){
        if (this.d3Init || this.recentExams == undefined){ 
            return;
        }
        this.d3Init = true;
        Promise.all([loadScript(this, D3 + '/d3.min.js')])
            .then(() => {
                this.d3Init = true;
                this.initD3();
            })
            .catch(error => {
                this.dispatchEvent(
                    console.log('error:', error),
                    new ShowToastEvent({
                        title: 'Error loading D3',
                        message: error.message,
                        variant: 'error'
                    })
                );
            });
    }

    initD3() {
        const width = 700;
        const height = 400;
        const margin = { left: 80, top: 40, right: 20, bottom: 50 }
        const getRatio = side => (margin[side] / width) * 100 + '%';

        const marginRatio = {
            left: getRatio('left'),
            top: getRatio('top'),
            right: getRatio('right'),
            bottom: getRatio('bottom')
          }
        
        // Use d3 to select svg tag in HTML and set the width, height, and margin of bar chart
        const svg = d3
            .select(this.template.querySelector('svg.d3'))
            .style('padding', marginRatio.top + ' ' + marginRatio.right + ' ' + marginRatio.bottom + ' ' + marginRatio.left + ' ')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height+ margin.top + margin.bottom)
            .attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom])
            .attr("style", "width: 100%; height: auto; height: intrinsic;");

        // Take data from wired property and put in javascript array format
        let data=[];
        for(const exam of this.recentExams) {
            data.push({"exam": exam.Exam__r.Name, "score": exam.Score__c, "pass": exam.Pass__c});
        }

        // Set scales for the x and y axis of chart
        const x = d3.scaleBand().range([0,width]).padding(0.4)
        const y = d3.scaleLinear().range([height,0]);
        
        var g = svg
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        x.domain(data.map(function(d) { return d.exam; }));
        y.domain([0, d3.max(data, function(d) { return d.score })]);

        g.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        g.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(y).tickFormat(function(d){
                return d+'%';
            }).ticks(4))
            // .append("text")
            // .attr("y", 6)
            // .attr("dy", "0.71em")
            // .attr("text-anchor", "end")
            // .text("score");

        g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", function(d) {
                    if (d.pass){ return "bar-pass" }
                    else{ return "bar-fail" }
                })
            .attr('rx', 2)
            .attr('ry', 2)
            .attr('stroke','#312d2d')
            .attr('stroke-width','1')
            .on("mouseover", onMouseOver)
            .on("mouseout", onMouseOut)
            .attr("x", function(d) { return x(d.exam) })
            .attr("y", function(d) { return y(0) })
            .attr("width", x.bandwidth())
            .attr("height", function(d) { return height - y(0) });

        // Creates initial animation
        svg.selectAll("rect")
            .transition()
            .duration(800)
            .attr("y", function(d) { return y(d.score); })
            .attr("height", function(d) { return height - y(d.score); })
            .delay(function(d, i) { return(i * 100)})
            

        let text = '';
        function onMouseOver (d, i){
            var score = 0;
            var yText = 0;
            var xText;
            d3.select(this).attr('class', 'highlight');
            d3.select(this)
                .transition()
                .duration(400)
                .attr('width', x.bandwidth() + 5)
                .attr("y", function(d) { 
                    score = d.score;
                    yText = y(d.score);
                    xText = x(d.exam) + x.bandwidth() / 3;
                    return y(d.score) - 10; 
                })
                .attr("height", function(d) { return height - y(d.score) + 10; });

            text = g.append("text")
                .attr('class', 'val')
                .attr('x', 0)
                .attr('y', yText - 15)
                .style("opacity", 0)
                .text(function() {
                    return [ Math.round(score)+ '%' ];
                });

            text.transition()
                .duration(500)
                .style("opacity", 1)
                .attr('x', xText)
                
        }

        function onMouseOut(d,i){
            d3.select(this).attr("class", function(d) {
                if (d.pass){ return "bar-pass" }
                else{ return "bar-fail" }
            });

            d3.select(this)
                .transition()
                .duration(500)
                .attr('width', x.bandwidth())
                .attr("y", function(d) { return y(d.score); })
                .attr("height", function(d) { return height - y(d.score); });
    
            text.transition()
                .style("opacity", 1)
                .duration(500)
                .style('opacity', 0)
                .remove();
        }
    }
    
}