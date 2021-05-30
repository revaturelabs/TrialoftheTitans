({

    drawChart : function(component, event, titans) {
        
    /* ------------------------------ D3 CODE STARTS ------------------------------------------------------------*/
    const MARGIN = { TOP: 20, BOTTOM: 30, RIGHT: 10, LEFT: 90}
    const WIDTH = 880 - MARGIN.LEFT - MARGIN.RIGHT;
    const HEIGHT = 880 - MARGIN.TOP - MARGIN.BOTTOM;
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
    teamColors.set('Avg', 'black');
    let userTeam = 'Synergy';

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
    /*-----------------------------------DRAW RADIAL CHART GRID---------------------------------------------------------*/
    // A radial scale with 12 angular axes
    const angularData = d3.range(0,lineCount,1);
    const radialData  = d3.range(0,110,10); // 10 positions
    const scaleGridRadius = d3.scaleLinear()
        .domain(d3.extent(radialData))
        .range([0, WIDTH/2 - MARGIN]);
    // place in middle of viewport and rotate

    // renders the radial grid
    g.selectAll("circle.circle-grid")
            .data(radialData).join("circle").attr("class", "circle-grid").transition().delay(1000).duration(1000)
            .attr("r", scaleRadius);

    // backdrop
    d3.select(".axis") // selects only first axis
            .selectAll(".tick")
            .insert("rect", ".tick text")
            .attr("x", -8)
            .attr("width", 16).attr("height", 16);

    // moves tick lines to center of domain
    d3.selectAll(".tick text").attr("y", 4)
    .attr("transform", "rotate(90)");
    d3.selectAll(".tick rect").attr("y", -8);
    /*--------------------------------------END------------------------------------------------------------------------*/

    /*------------------------------------DRAW RADIAL CHART--------------------------------------------------------------*/
    const radialLines =  g.selectAll("path").data(inputData).join("path")
                        .attr("class", "radials").style("fill-opacity", .1)
                        .transition().delay(3500).duration(3000)
                        .attr("d", (d, i) => spiral(d.averages))
                        .style("stroke", (d,i) => i == 0 ? teamColors.get(userTeam) : teamColors.get('Avg'))
                        .style("stroke-width", (d, i) => i==0 ? 8 : 2)
                        .style("fill", (d,i) => teamColors.get(userTeam));

    const axisLines = g.selectAll("g.axis")  // renders the angular axes
                        .data(inputData[0].averages).join("g")
                        .attr("class", "axis")
                        .classed("blank",(d,i) => i != 0)
                        .call(axis)
                        .transition().delay(2000).duration(3000)
                        .attr("transform", (d,i) => `rotate(${(i * 360/(lineCount))})`);
    // moves tick lines to center of domain
    d3.selectAll(".tick line").attr("y1", -3).attr("y2", 4);

    const axisLabels =  g.selectAll("g.axis").data(inputData[0].averages)
                        .append("text").transition().delay(3501).duration(500)
                        .attr("id", "#label-show")
                        .style("fill", "black").style("text-anchor", "middle")
                        .text((d,i) => trackLabels[i]).style("display", "inline")
                        .attr("transform", d => `translate(0, ${scaleRadius(100) + 19})`);        
    
    /*----------------------------------------CODE ENDS --------------------------------------------------------------*/                                      
            

    }
})
