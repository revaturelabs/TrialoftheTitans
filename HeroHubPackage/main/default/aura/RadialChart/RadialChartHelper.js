({
    drawChart : function(component, event) {
        let data = component.get('v.contextInfo');
        console.log("made it to helper ");
        console.log(data);
        const width  = 1100;
        const height = 1400;
        const margin = 100;
        
        let cmp = component.find('mydthree').getElement();
        let titans = {
            "Apex": [
                {
                    "currentResults": [],
                    "highScore": .49,
                    "isPassed": false,
                    "name": "ello",
                    "nextExam": "asdfasdf",
                    "pastResult": []
                },
                {
                    "currentResults": [],
                    "highScore": .89,
                    "isPassed": false,
                    "name": "ello",
                    "nextExam": "asdfasdf",
                    "pastResult": []
                }],
            "Data Modeling": [
                {
                    "currentResults": [],
                    "highScore": .29,
                    "isPassed": false,
                    "name": "ello",
                    "nextExam": "asdfasdf",
                    "pastResult": []
                },
                {
                    "currentResults": [],
                    "highScore": .19,
                    "isPassed": false,
                    "name": "ello",
                    "nextExam": "asdfasdf",
                    "pastResult": []
                }],
            "Process Automation": [
                {
                    "currentResults": [],
                    "highScore": .69,
                    "isPassed": false,
                    "name": "ello",
                    "nextExam": "asdfasdf",
                    "pastResult": []
                },
                {
                    "currentResults": [],
                    "highScore": .29,
                    "isPassed": false,
                    "name": "ello",
                    "nextExam": "asdfasdf",
                    "pastResult": []
                }],
                "Security": [
                    {
                        "currentResults": [],
                        "highScore": .19,
                        "isPassed": false,
                        "name": "ello",
                        "nextExam": "asdfasdf",
                        "pastResult": []
                    },
                    {
                        "currentResults": [],
                        "highScore": .69,
                        "isPassed": false,
                        "name": "ello",
                        "nextExam": "asdfasdf",
                        "pastResult": []
                    }]
        };
        console.log("loaded data " + titans);
        /* ------------------------------ CODE STARTS ------------------------------------------------------------*/
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
                        .domain([0, 1])
                        .range([0, width/2 - margin]);
        const spiral = d3.areaRadial()
                        .angle((d,i) =>  i/4 * Math.PI * 2)
                        .outerRadius(d => scaleRadius(d));
        const axis = d3.axisBottom(scaleRadius)
                         .ticks(6)
                        .tickSize(0);

        const svg = d3.select("body")
                    .append("svg")
                    .attr("height",height)
                    .attr("width",width);

        const g = svg.append("g")
            .attr("transform","translate(600, 800)");
        let inputData = [];
        inputData.push(sourceData);
        inputData.push(highScoreData);
        let avgFlag = false;

        const averageRadial =  g.selectAll("path").data(inputData).join("path")
            .attr("d", (d, i) => spiral(d.averages))
             .style("fill-opacity", .1)
             .style("stroke", (d,i) => i == 0 ? teamColors.get(userTeam) : teamColors.get('Avg'))
             .style("stroke-width", (d, i) => i==0 ? 8 : 2)
             .style("fill", (d,i) => teamColors.get(userTeam));

        const max = d3.max(inputData[0].averages, d => d);

        g.selectAll("g.axis")
                 .data(inputData[0].averages).join("g")
                 .attr("class", "axis")
                  .classed("blank",(d,i) => i != 0)
                  .call(axis)
                .transition().delay(3000).duration(2000)
                  .attr("transform", (d,i) => `rotate(${(i * 360/(4))})`);

        g.selectAll("g.axis").data(inputData[0].averages)
                  .append("text")
                 .style("font-size", "50px").style("fill", "black").style("text-anchor", "middle")
                 .text((d,i) => trackLabels[i])
                 .attr("transform", d => `translate(0, ${scaleRadius(1) + 40})`);


             
      /*----------------------------------------CODE ENDS --------------------------------------------------------------*/
                                       
        

    }
})
