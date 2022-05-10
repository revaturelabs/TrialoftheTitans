import { LightningElement, track, wire} from 'lwc';
import chartjs from '@salesforce/resourceUrl/ChartJs';
import chartPlugin from '@salesforce/resourceUrl/chartPlugin';
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getDonutData from '@salesforce/apex/getDataForDonut.getDonutData';


export default class MyCustomChart extends LightningElement {
    @wire (getDonutData) skillList({error,data})
    {
       if(data)
       {
          for(var key in data)
           {
              this.updateChart(data[key]);
              //console.log(skillList);
              console.log(data[key]);
           }
          this.error=undefined;
       }
      else if(error)
      {
         this.error = error;
         this.skillList = undefined;
      }
    }
    
    
    @track isChartJsInitialized;
    chart;
    config = {
        type: "doughnut",
        data: {
        datasets: [
        {
        data: [],
        backgroundColor: []
        }
        ],
        labels: []
        }
    };

    renderedCallback() {
        
        if (this.isChartJsInitialized) {
            return;
        }
        this.isChartJsInitialized = true;
        Promise.all([
            loadScript(this, chartjs), loadScript(this, chartPlugin)
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
        console.log(this.skillList);
    }

    updateChart(label) {

        this.chart.data.datasets.forEach((dataset) => {
            dataset.data.push(label);
            this.chart.update();
        });
        this.chart.update();
    }

}