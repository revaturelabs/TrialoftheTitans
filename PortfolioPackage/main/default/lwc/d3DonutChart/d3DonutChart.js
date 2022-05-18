//Authors: Adam Baird, Alberto Vergara, Tim Hinga, Austin McElrone
//Date: 5/16/22
//Purpose: Creates a donut chart using D3 for the profile page
//         of the user of the skills they have earned.
//         The static resource for D3 v. 6.7 is in the static resources
//         folder in the Portfolio package.

import { LightningElement, wire } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import D3 from '@salesforce/resourceUrl/d3v67';
import DonutResource from '@salesforce/resourceUrl/DonutChart'
import getSkills from '@salesforce/apex/AssignmentController.getCompletedAssignmentsSkillMap';


export default class D3DonutChart extends LightningElement {
    @wire(getSkills) dat ({error,data}) {
        if(data) {
            let skillsMap = []; //converts apex map to JS array
            for (let key in data) 
                skillsMap.push({name: key, value: data[key]});

            DonutChart(this.template.querySelector('div.d3'), skillsMap, { //call function to create the donut chart
                name: d => d.name,
                value: d => d.value,
                width: 500,
                height: 500
            })
        }
    }

    renderedCallback() {
        loadScript(this, D3 + '/d3.v6.js') //load script for D3
            .then(() => {
                loadScript(this, `${DonutResource}/donutChart.js`); //load script for static resource for DonutChart function
            })
            .catch(error => {
                console.error(error);
            });
    }

}