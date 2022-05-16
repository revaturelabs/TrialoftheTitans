import { LightningElement, wire } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import D3 from '@salesforce/resourceUrl/D3_v3';
//import getDonutData from '@salesforce/apex/UserInfoHelper.getDonutData';
import DonutResource from '@salesforce/resourceUrl/DonutChart'

export default class D3DonutChart extends LightningElement {
    dat = {a: 9, b: 20, c:30, d:8, e:12}

    renderedCallback() {
        console.log('****after d3Init******')

        loadScript(this, `${D3}/d3.js`)
            .then(() => {
                console.log('*****in first .then*****')
                loadScript(this, `${DonutResource}/donutChart.js`)
                    .then(() => {
                        console.log('****in second .then*****');
                        this.renderDonutChart();
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

        var color = d3.scale.ordinal()
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])

        var donutChartOptions = {
            w: width,
            h: height,
            margin: margin,
            radius: radius,
            color: color
        }

        DonutChart(this.template.querySelector('div.d3'), this.dat, donutChartOptions)

   }

}