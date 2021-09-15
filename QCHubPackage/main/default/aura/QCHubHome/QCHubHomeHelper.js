({
    // Load a list of all currently active cohorts (on init)
    LoadCohorts : function(component) {

        let CohortListInit = component.get("c.RetrieveCohorts");

        CohortListInit.setCallback(this, function(response){

            let state = response.getState();

            if (state === "SUCCESS"){
                let cohorts = response.getReturnValue();
                component.set("v.CohortList", cohorts);
                
                if (component.get("v.ScriptLoaded")){
                    this.D3CohortOverview(component);
                }
                component.set("v.DataLoaded", true);
            }

            else if (state === "ERROR"){
                let errors = response.getError();
                let showToast = $A.get("e.force:showToast");
                if (errors) {
                    showToast.setParams({
                        "title": "ERROR",
                        "message": errors[0].message
                    })
                    showToast.fire();
                }
                else {
                    showToast.setParams({
                        "title": "ERROR",
                        "message": "Unknown error"
                    })
                    showToast.fire();
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
                let weeks = response.getReturnValue();
                component.set("v.WeekList", weeks);
            }else if (state === "ERROR"){
                let errors = response.getError();
                let showToast = $A.get("e.force:showToast");
                if (errors) {
                    showToast.setParams({
                        "title": "ERROR",
                        "message": errors[0].message
                    })
                    showToast.fire();
                }
                else {
                    showToast.setParams({
                        "title": "ERROR",
                        "message": "Unknown error"
                    })
                    showToast.fire();
                }
            }
        });

        $A.enqueueAction(WeekListInit);

    },

    LoadCohortData : function(component, selectedCohort){
        let CohortInit = component.get("c.RetrieveCohortData");
        CohortInit.setParams({cohortStr : JSON.stringify(selectedCohort)});

        CohortInit.setCallback(this, function(response){

            let state = response.getState();

            if (state === "SUCCESS"){
                let cohortData = response.getReturnValue();
                component.set("v.SelectedCohort", cohortData);
                component.set("v.SquadList", cohortData.squadList);
                component.set("v.HeroList", cohortData.heroList);
            }

            else if (state === "ERROR"){
                let errors = response.getError();
                let showToast = $A.get("e.force:showToast");
                if (errors) {
                    showToast.setParams({
                        "title": "ERROR",
                        "message": errors[0].message
                    })
                    showToast.fire();
                }
                else {
                    showToast.setParams({
                        "title": "ERROR",
                        "message": "Unknown error"
                    })
                    showToast.fire();
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
                "c__Cohort": component.get("v.SelectedCohort"),
                "c__WeekList": component.get("v.WeekList")
            }
    
        }
        
        navService.navigate(interviewReference);
    },


    D3CohortOverview : function(component){
        var data = [];

        for (let dat of component.get("v.CohortList")){
            data.push({ cohortName  : dat.Name,
                        qcAv        : dat.QC_Interview_Sum__c/dat.QC_Interview_Count__c});
        }

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

         
        var cOverview = d3.select(".svgCohortOverview").append("svg")
                            .attr("height", height).attr("width", barWidth*data.length);

        var xScale = d3.scaleBand().range ([0, width]).padding(0.4),
        yScale = d3.scaleLinear().range ([height, 0]);

        xScale.domain(data.map(function(d) { return d.year; }));
        yScale.domain([0, d3.max(data, function(d) { return d.value; })]);

        var cbars = cOverview.selectAll("g").data(data).enter().append("g");

        cbars.attr("transform", function(d,i){
                                return "translate(" + i*barWidth + ", 0)";
                            });

        cbars.append("rect").attr("height", function(d, i){
                                return d * scaleFactor;
                            });
        
    },
    D3 : function(component, event){
        if (component.get("v.DataLoaded")){
            this.D3CohortOverview(component);
        }
        component.set("v.ScriptLoaded", true);
    }

})