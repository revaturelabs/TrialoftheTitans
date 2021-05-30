/*
//Name: RadialChart Component Controller Helper
//Author: Andreology
//Created: 05/19/2021
//Updated: 05/30/2021
//Description: This Component will have halper methods to generate the radial chart based on overall titan progress. 
*/
({  
    SetUpChart : function(component, event, titans) {
        const MARGIN = { TOP: 20, BOTTOM: 30, RIGHT: 10, LEFT: 90}
        const WIDTH = 490 - MARGIN.LEFT - MARGIN.RIGHT;
        const HEIGHT = 490 - MARGIN.TOP - MARGIN.BOTTOM;
        let currKey = 0;
        let sourceData = {};
        let trackExamAverage = [];
        let trackLabels = [];
        let currHighScores = [];
        let teamColors = new Map();
        teamColors.set('Amplifire', '#C24747');
        teamColors.set('Synergy', '#F4CF38');
        teamColors.set('Alchemy', '#84C247');
        teamColors.set('Vanquish', '#475BC2');
        teamColors.set('Avg', 'purple');
        let userTeam = 'Synergy';

        this.FindHighAvgScores(titans, trackLabels, trackExamAverage, currHighScores, currKey);
    
        //adding last element to list to make a full radial circle
        let lastScore = trackExamAverage[0];
        trackExamAverage.push(lastScore);
        sourceData = {
            "name" : "averages",
            "averages": trackExamAverage
        };
        let lastHighScore = currHighScores[0];
        currHighScores.push(lastHighScore);
        let highScoreData = {
            "name" : "highscores",
            "averages": currHighScores
        };      
            
        const colorScale = d3.scaleSequential(d3.interpolateSpectral)
                            .domain([0,sourceData.length]);
        const scaleRadius = d3.scaleLinear()
                            .domain([0, 100])
                            .range([0, WIDTH/2 - MARGIN.TOP]);
        const spiral = d3.areaRadial()
                        .angle((d,i) =>  i/4 * Math.PI * 2)
                        .outerRadius(d => scaleRadius(d * 100));
        const axis = d3.axisBottom(scaleRadius)
                        .ticks(6)
                        .tickSize(0);
                /*        
                .ticks(10)
                .tickSize(0)       // will be controlled in SVG and CSS
                .tickPadding(0)
                .tickSizeOuter(0); // removes edge lines from domain
                */
        const comp = d3.select("#mydthree");
        const svg = comp.append("svg")
                        .attr("viewBox", `0 0 ${WIDTH + MARGIN.LEFT + MARGIN.RIGHT} ${HEIGHT + MARGIN.TOP + MARGIN.BOTTOM}`);
        const g = svg.append("g")
                    .attr("transform",`translate(${HEIGHT/2}, ${WIDTH/2})`);

        let inputData = [];
        inputData.push(sourceData);
        inputData.push(highScoreData);
        let avgFlag = false;
        let lineCount = inputData[0].averages.length - 1;
        const radialData  = d3.range(0,110,10); // 10 positions

        this.GenerateGrid(g, scaleRadius, radialData);
        
        this.GenerateRadialGraph(g, scaleRadius, spiral,
                                axis, lineCount, inputData,
                                teamColors, userTeam, trackLabels);    
    },
    GenerateRadialGraph : function (g, scaleRadius, spiral, axis, lineCount, inputData, teamColors, userTeam, trackLabels) {
        const spiralAt0 = d3.areaRadial()
        .angle((d,i) =>  0)
        .outerRadius(d => 0);

        const radialLines =  g.selectAll("path").data(inputData).join("path")
                .attr("class", "radials").attr("d", (d, i) => spiralAt0(d.averages));
        radialLines.transition().delay(600)
            .duration(3000).ease(d3.easeElastic)
            .attr("d", (d, i) => spiral(d.averages))
            .attr("stroke", (d,i) => i == 0 ? teamColors.get('Avg') : teamColors.get(userTeam)  )
            .attr("fill", (d,i) =>  i == 0 ? teamColors.get('Avg') : teamColors.get(userTeam)  );

        const axisLines = g.selectAll("g.axis")  // renders the angular axes
                .data(inputData[0].averages).join("g")
                .attr("class", "axis")
                .classed("blank",(d,i) => i != 0)
                .call(axis)
                .transition().delay(1500).duration(1000)
                .attr("transform", (d,i) => `rotate(${(i * 360/(lineCount))})`);
        // moves tick lines to center of domain
        d3.selectAll(".tick line").attr("y1", -3).attr("y2", 4);

        const axisLabels =  g.selectAll("g.axis").data(inputData[0].averages)
                .append("text").transition().delay(301).duration(1000).attr("class", "titan-labels")
                .attr("fill", "black").attr("text-anchor", "middle")
                .text((d,i) => trackLabels[i]).style("display", "inline")
                .attr("transform", d =>{
                    console.log("checking value ");
                    console.log(scaleRadius(100));
                    return `translate(0, ${scaleRadius(100) + 19}) rotate(0)`
                }); 

      
    },
    GenerateGrid : function (g, scaleRadius, radialData) {
        // place in middle of viewport and rotate
        // renders the radial grid
        g.selectAll("circle.circle-grid")
            .data(radialData).join("circle")
            .attr("class", "circle-grid")
            .transition().delay(600).duration(3000).ease(d3.easeElastic)
            .attr("r", scaleRadius);
        // backdrop
        d3.select(".axis") // selects only first axis
            .selectAll(".tick")
            .insert("rect", ".tick text")
            .attr("x", -8)
            .attr("width", 16).attr("height", 16);
        // moves tick lines to center of domain
        d3.selectAll(".tick text")
            .attr("y", 4)
            .attr("transform", "rotate(90)");
        d3.selectAll(".tick rect")
            .attr("y", -8);
    },
    FindHighAvgScores : function (titans, trackLabels, trackExamAverage, currHighScores, currKey) {
        for (let exams in titans) { 
            let total = 0;
            let currHighScore =0;
            trackLabels.push(exams);
    
            titans[exams].forEach( exam => {
                let examScore = exam.highScore;
                total += examScore;
                if(examScore > currHighScore) {
                        currHighScore = examScore;
                }
            });
            currHighScores.push(currHighScore);
            let titanAverageScore = total / titans[exams].length;
            trackExamAverage.push(titanAverageScore);
            currKey++;
        }
    }
})
