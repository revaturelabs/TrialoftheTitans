({
    // Load a list of all currently active cohorts (on init)
    LoadCohorts : function(component) {

        let CohortListInit = component.get("c.RetrieveCohorts");

        CohortListInit.setCallback(this, function(response){

            let state = response.getState();

            if (state === "SUCCESS"){
                console.log(state);
                var cohorts = response.getReturnValue();
                component.set("v.CohortList", cohorts);
                
                if (component.get("v.ScriptLoaded")){
                    helper.D3CohortOverview(component);
                }
                component.set("v.DataLoaded", true);

            }
            
            else if (state === "INCOMPLETE"){
                console.log(state);

            }

            else if (state === "ERROR"){
                console.log(state);
                var errors = response.getError();

                if (errors) {
                    if (errors[0] && errors[0].message){
                        console.log("Error message: " + errors[0].message);

                    }

                }
                else {
                    console.log("Unknown error");

                }

            }

        });

        $A.enqueueAction(CohortListInit);

    },


    LoadWeeks : function(component){

        let WeekListInit = component.get("c.RetrieveWeeks");

        WeekListInit.setCallback(this, function(response){

            let state = response.getState();

            if (state === "SUCCESS"){
                console.log(state);
                var weeks = response.getReturnValue();
                component.set("v.WeekList", weeks);

            }
            
            else if (state === "INCOMPLETE"){
                console.log(state);

            }

            else if (state === "ERROR"){
                console.log(state);
                var errors = response.getError();

                if (errors) {
                    if (errors[0] && errors[0].message){
                        console.log("Error message: " + errors[0].message);

                    }

                }
                else {
                    console.log("Unknown error");

                }

            }

        });

        $A.enqueueAction(WeekListInit);

    },
    
    LoadHeros : function(component) {
        let loadHeros = component.get("c.HeroList");
        loadHeros.setCallback(this, function(response) {
           let state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.HeroList", response.getReturnValue());
            } else {
                console.log("Could not get HeroList");
            }
        });
        $A.enqueueAction(loadHeros);
    },


    // Load data for a specific cohort (launched by UpdateCohort function in main JS controller,
    // which is triggered by UpdateCohortEvent from CohortButtons component when a cohort is selected)
    LoadCohortData : function(component, selectedCohort){
        console.log("Cohort data helper");
        let CohortInit = component.get("c.RetrieveCohortData");
        console.log(JSON.stringify(selectedCohort));
        CohortInit.setParams({cohortStr : JSON.stringify(selectedCohort)});

        CohortInit.setCallback(this, function(response){

            let state = response.getState();

            if (state === "SUCCESS"){
                console.log(state);
                let cohortData = response.getReturnValue();
                console.log(cohortData);
                console.log(component.get("v.DataLoaded"));
                console.log(component.get("v.ScriptLoaded"));
                component.set("v.SelectedCohort", cohortData);
                component.set("v.SquadList", cohortData.squadList);

            }
            
            else if (state === "INCOMPLETE"){
                console.log(state);

            }

            else if (state === "ERROR"){
                console.log(state);
                let errors = response.getError();

                if (errors) {
                    if (errors[0] && errors[0].message){
                        console.log("Error message: " + errors[0].message);

                    }

                }
                else {
                    console.log("Unknown error");

                }

            }

        });

        $A.enqueueAction(CohortInit);

    },


    LaunchInterview : function(component){
        let navService = component.find("navService");
        let interviewReference = {
            type: 'standard__component',
            attributes: {
                componentName: 'c__QCInterview'

            },
            state: {
                c__Cohort: component.get("v.SelectedCohort"),
                c__CohortId: "6712345"
            }
    
        }
        //console.log(JSON.stringify(interviewReference));
        //console.log(JSON.stringify(component.get("v.SelectedCohort")));
        console.log(component.get("v.WeekList"));
        sessionStorage.setItem('ActiveCohort', JSON.stringify(component.get("v.SelectedCohort")));
        console.log("QCHubHome: ");
        console.log(JSON.stringify(component.get("v.WeekList")));
        sessionStorage.setItem('WeekList', JSON.stringify(component.get("v.WeekList")));
        navService.navigate(interviewReference);

    },


    D3CohortOverview : function(component){
        console.log("D3 HELPER");
        var data = [];
        console.log(data);

        for (let dat of component.get("v.CohortList")){
            console.log(dat);
            console.log("ADDING TO DATA");
            data.push({ cohortName  : dat.Name,
                        qcAv        : dat.QC_Interview_Sum__c/dat.QC_Interview_Count__c});
            console.log(data);
        }

        console.log(data);


        var height = 500,
        scaleFactor = 10,
        barWidth = 150;

        var cOverview = d3.select(".svgCohortOverview").append("svg")
                            .attr("height", height).attr("width", barWidth*data.length);


        var svg = d3.select("svg"),
            margin = 200,
            width = svg.attr("width") - margin,
            height = svg.attr("height") - margin


        var xScale = d3.scaleBand().range([0, width]).padding(0.4),
            yScale = d3.scaleLinear().range([height, 0]);

        var g = svg.append("g")
            .attr("transform", "translate(" + 100 + "," + 100 + ")");

        xScale.domain(data.map(function(d) { return d.cohortName; }));
        yScale.domain([0, d3.max(data, function(d) { return d.qcAv; })]);

        g.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(xScale));

        g.append("g")
         .call(d3.axisLeft(yScale).tickFormat(function(d){
             return d;
         }).ticks(10));

        g.selectAll(".bar")
         .data(data)
         .enter().append("rect")
         .attr("class", "bar")
         .attr("x", function(d) { return xScale(d.cohortName); })
         .attr("y", function(d) { return yScale(d.qcAv); })
         .attr("width", xScale.bandwidth())
         .attr("height", function(d) { return height - yScale(d.qcAv); });

         /*
        var cOverview = d3.select(".svgCohortOverview").append("svg")
                            .attr("height", height).attr("width", barWidth*data.length);

        var xScale = d3.scaleBand().range ([0, width]).padding(0.4),
        yScale = d3.scaleLinear().range ([height, 0]);

        xScale.domain(data.map(function(d) { return d.year; }));
        yScale.domain([0, d3.max(data, function(d) { return d.value; })]);

        var cbars = cOverview.selectAll("g").data(data).enter().append("g");

        cbars.attr("transform", function(d,i){
                                console.log("translated");
                                return "translate(" + i*barWidth + ", 0)";
                            });

        cbars.append("rect").attr("height", function(d, i){
                                return d * scaleFactor;
                            });
        */
    }

})
