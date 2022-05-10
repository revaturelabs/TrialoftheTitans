import { LightningElement, track, api } from 'lwc';
import Chartjs from '@salesforce/resourceUrl/chartJs';
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class MyCustomChart extends ChartDataProvider ( LightningElement ) {

    @track isChartJsInitialized;
    chart;

    config = {
        type: "doughnut",
        data: {
        datasets: [
        {
        data: [200, 450, 300, 50],
        backgroundColor: [
        "#ff6384",
        "#36a2eb",
        "#ffcd56",
        "#42d83f"
        ]
        }
        ],
        labels: ["Top", "High", "Low", "Volume"]
        }
    };

    renderedCallback() {
        if (this.isChartJsInitialized) {
            return;
        }
        this.isChartJsInitialized = true;

        Promise.all([
            loadScript(this, Chartjs)
        ]).then(() => {
            const ctx = this.template.querySelector('canvas.myChart').getContext('2d');
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