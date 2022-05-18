import { LightningElement, wire } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import D3 from '@salesforce/resourceUrl/d3v67';
//import getDonutData from '@salesforce/apex/UserInfoHelper.getDonutData';
import DonutResource from '@salesforce/resourceUrl/DonutChart'
import getSkills from '@salesforce/apex/AssignmentController.getCompletedAssignmentsSkillMap';


export default class D3DonutChart extends LightningElement {
    @wire(getSkills) dat ({error,data}) {
        if(data) {
            this.renderDonutChart(data);
        }
    }

    renderedCallback() {
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
                console.error(error);
            });
    }

   renderDonutChart(chartData) {

    let donutData = [{name: "Skill 1", value: 2}, {name: "Skill 2", value: 3}, {name: "Skill 3", value: 1}]

        DonutChart(this.template.querySelector('div.d3'), donutData, {
            name: d => d.name,
            value: d => d.value,
            width: 500,
            height: 500
          })

   }

}