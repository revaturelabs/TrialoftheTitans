//Authors: Adam Baird, Alberto Vergara, Tim Hinga, Austin McElrone
//Date: 5/9/22
//Purpose: Creates a donut chart for the profile page of the user
//         of the skills they have earned. Uses ChartJS.
//         Static resources are in the main/default/ folder.

//Imports for resources
import { LightningElement, track, wire } from 'lwc';
import chartjs from '@salesforce/resourceUrl/ChartJs';
import dataLabels from '@salesforce/resourceUrl/DataLabels'
import colorSchemes from '@salesforce/resourceUrl/ColorSchemes'
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getDonutData from '@salesforce/apex/UserInfoHelper.getDonutData';

//Class sets up the Donut Chart that displays the skills for the portfolio
export default class MyCustomChart extends LightningElement {
    //Grabbing the skill list and setting them into the donut chart
    @wire(getDonutData) skillList({error,data}) {

        if(data) {
            for(var key in data) {
                this.chart.data.datasets[0].data[key] = 1;
                this.chart.data.labels.push(data[key]);
            }
            this.chart.update();

            this.error=undefined;
        }
        else if(error) {
            this.error = error;
            this.skillList = undefined;
        }
    }

    @track isChartJsInitialized;
    chart;
    //configures the donut shape and color
    config = {
        type: "doughnut",
        data: {
            datasets: [{
                data: [],
                backgroundcolor: []
            }]
        },
        options: {
            legend: {
                display: false
            },
            plugins: {
                datalabels: {
                    display: true,
                    formatter: (val, ctx) => {
                        return ctx.chart.data.labels[ctx.dataIndex];
                    },
                    color: '#fff',
                    backgroundColor: '#404040'
                },
                colorschemes: {
                    scheme: 'brewer.Spectral11'
                }
            }
        }
    };

    //Rendered Callback for scripts
    renderedCallback() {
        if (this.isChartJsInitialized) {
            return;
        }
        this.isChartJsInitialized = true;
        Promise.all([
            loadScript(this, chartjs), loadScript(this, dataLabels), loadScript(this, colorSchemes)
        ]).then(() => {
            const ctx = this.template.querySelector('canvas.donutchart').getContext('2d');
            this.chart = new window.Chart(ctx, this.config);
            this.chart.canvas.parentNode.style.height = '100%';
            this.chart.canvas.parentNode.style.width = '100%';
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error loading ChartJS',
                    message: error.message,
                    variant: 'error',
                }),
            );
        });
    }
}