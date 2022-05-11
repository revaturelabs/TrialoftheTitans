import { LightningElement, track, wire } from 'lwc';
import chartjs from '@salesforce/resourceUrl/ChartJs';
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getDonutData from '@salesforce/apex/getDataForDonut.getDonutData';


export default class MyCustomChart extends LightningElement {
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
    
    config = {
        type: "doughnut",
        labels: [],
        data: {
            datasets: [{
                data: [],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ]
            }]
        }
    };

    renderedCallback() {
        if (this.isChartJsInitialized) {
            return;
        }
        this.isChartJsInitialized = true;

        Promise.all([
            loadScript(this, chartjs)
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