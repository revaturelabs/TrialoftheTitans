import { LightningElement, wire } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import D3 from '@salesforce/resourceUrl/d3v67';
import DonutResource from '@salesforce/resourceUrl/DonutChart'
import getSkills from '@salesforce/apex/AssignmentController.getCompletedAssignmentsSkillMap';


export default class D3DonutChart extends LightningElement {
    @wire(getSkills) dat;

    renderedCallback() {
        console.log('****after d3Init******')

        loadScript(this, D3 + '/d3.v6.js')
        .then(() => {
            getSkills;

        }).then(() => {
                console.log('*****in first .then*****')
                loadScript(this, `${DonutResource}/donutChart.js`)
                    .then(() => {
                        console.log('****in second .then*****');
                        this.renderDonutChart();
                        console.log(dat);
                    })
            })
            .catch(error => {
                console.log("******error*******")
                console.error(error);
            });
    }

   renderDonutChart() {
        
        var width = 450;
        var height = 450;
        var margin = 40;

        var radius = Math.min(width, height) / 2 - margin;

        var color = d3.scaleOrdinal()
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])

        var donutChartOptions = {
            w: width,
            h: height,
            margin: margin,
            radius: radius,
            color: color
        }
        console.log('this is the dat: ' + this.dat);
        DonutChart(this.template.querySelector('div.d3'), this.dat, donutChartOptions)

   }

}