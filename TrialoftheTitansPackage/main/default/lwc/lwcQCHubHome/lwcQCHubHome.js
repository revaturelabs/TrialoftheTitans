import { LightningElement,wire, api } from 'lwc';
import  RetrieveCohorts from "@salesforce/apex/QCHubHomeAuraController.RetrieveCohorts";
import   RetrieveWeeks  from "@salesforce/apex/QCHubHomeAuraController.RetrieveWeeks";
import   RetrieveCohortData  from "@salesforce/apex/QCHubHomeAuraController.RetrieveCohortData";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
//import * as d3JS from "@salesforce/resourceUrl/d3";
export default class LwcQCHubHome extends LightningElement
{
     
    /*CorhortList=[{}];

    SelectedCohort={};
    
    NoCohortSelected=true;
   
    Hero={}
    
    SquadList={};
 
    WeekList={};
 
    ScriptLoaded=false;
  
    DataLoaded=false;
    @wire(RetrieveCohorts) cohorts({error, data})
    {
       
        if(data)
        {
            this.CorhortList=data;
            this.DataLoaded=true;
            if(this.ScriptLoaded)
            {
                this.D3CohortOverview();
            }
            
        }
        if(error)
        {
            var toastEvent=new ShowToastEvent({
                "title": "ERROR",
                "message": errors[0].message
            });
            this.dispatchEvent(toastEvent);
        }
       
        
    }
    @wire(RetrieveWeeks) weeks({error, data})
    {
        if(data)
        {
            this.WeekList=data;
        }
        if(error)
        {
            var toastEvent=new ShowToastEvent({
                "title": "ERROR",
                "message": errors[0].message
            });
            this.dispatchEvent(toastEvent);
        }
        
    }
    UpdateCohort(event){
        RetrieveCohortData({cohortStr : JSON.stringify(event.SelectedCohort)})
        .then(data =>
        {
            
                this.SelectedCohort=data;
                this.SquadList=data.SquadList;
                this.HeroList=data.heroList;
            }).catch(error =>
            {
                var toastEvent=new ShowToastEvent({
                    "title": "ERROR",
                    "message": errors[0].message
                });
                this.dispatchEvent(toastEvent);
            })
       
    }
    LaunchInterview()
    {
        this[NavigationMixin.GenerateUrl]({
            type: 'standard__component',
            attributes: {
                componentName: 'c__QCInterview'
            },
            state: {
                "c__Cohort": this.SelectedCohort,
                "c__WeekList": this.WeekList
            }
        }).then(url => {
            this.recordPageUrl =url;

        });
    }
    D3CohortOverview()
    {
        var data = [];

        for (let dat of this.CohortList){
            data.push({ cohortName  : dat.Name,
                        qcAv        : dat.QC_Interview_Sum__c/dat.QC_Interview_Count__c});
        }

        var height = 500,
        scaleFactor = 10,
        barWidth = 150;

        //var cOverview = d3JS.select(".svgCohortOverview").append("svg")
                            .attr("height", height).attr("width", barWidth*data.length);


        var svg = d3JS.select("svg"),
            margin = 200,
            width = svg.attr("width") - margin,
            height = svg.attr("height") - margin


        var xScale = d3JS.scaleBand().range([0, width]).padding(0.4),
            yScale = d3JS.scaleLinear().range([height, 0]);

        var g = svg.append("g")
            .attr("transform", "translate(" + 100 + "," + 100 + ")");

        xScale.domain(data.map(function(d) { return d.cohortName; }));
        yScale.domain([0, d3JS.max(data, function(d) { return d.qcAv; })]);

        g.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3JS.axisBottom(xScale));

        g.append("g")
         .call(d3JS.axisLeft(yScale).tickFormat(function(d){
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

         
        var cOverview = d3JS.select(".svgCohortOverview").append("svg")
                            .attr("height", height).attr("width", barWidth*data.length);

        var xScale = d3JS.scaleBand().range ([0, width]).padding(0.4),
        yScale = d3JS.scaleLinear().range ([height, 0]);

        xScale.domain(data.map(function(d) { return d.year; }));
        yScale.domain([0, d3JS.max(data, function(d) { return d.value; })]);

        var cbars = cOverview.selectAll("g").data(data).enter().append("g");

        cbars.attr("transform", function(d,i){
                                return "translate(" + i*barWidth + ", 0)";
                            });

        cbars.append("rect").attr("height", function(d, i){
                                return d * scaleFactor;
                            });
    }
    D3()
    {
        if (this.DataLoaded){
            this.D3CohortOverview(component);
        }
        this.ScriptLoaded=true;
    }*/
 }