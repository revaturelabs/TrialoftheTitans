import { LightningElement, wire } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import D3 from '@salesforce/resourceUrl/d3v67';
import DonutResource from '@salesforce/resourceUrl/DonutChart'
import getSkills from '@salesforce/apex/AssignmentController.getCompletedAssignmentsSkillMap';


export default class D3DonutChart extends LightningElement {
    @wire(getSkills) dat ({error,data}) {
        if(data) {
            let skillsMap = [];
            for (let key in data) {
                console.log(key);
                skillsMap.push({name: key, value: data[key]});
            }
            this.renderDonutChart(skillsMap);
        }
    }

    renderedCallback() {
        loadScript(this, D3 + '/d3.v6.js')
            .then(() => {
                loadScript(this, `${DonutResource}/donutChart.js`);
            })
            .catch(error => {
                console.error(error);
            });
    }

   renderDonutChart(chartData) {

        DonutChart(this.template.querySelector('div.d3'), chartData, {
            name: d => d.name,
            value: d => d.value,
            width: 500,
            height: 500
          })

   }

}