import { LightningElement, track, wire} from 'lwc';
import chartjs from '@salesforce/resourceUrl/ChartJs';
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getDonutData from '@salesforce/apex/getDataForDonut.getDonutData';


export default class MyCustomChart extends LightningElement {
    @wire(getDonutData) wiredl1;
    
    @track isChartJsInitialized;
    chart;
    config = {
        type: "doughnut",
        data: {
            datasets: [{
            data: [200, 450, 300, 50, 100, 30, 50, 60, 45, 90],
            labels: ['hi', 'hello', 'hola', 'good', 'bad', 'skill', 'this works', 'bye', 'goodbye', 'how'] 
         } ]
        }
    };

    renderedCallback() {
        console.log(this.l1);
        if (this.isChartJsInitialized) {
            return;
        }
        this.isChartJsInitialized = true;
        Promise.all([
            loadScript(this, chartjs)
        ]).then(() => {
            const ctx = this.template.querySelector('canvas.linechart').getContext('2d');
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
        console.log(this.l1);
    }

}