import { LightningElement, track, wire } from 'lwc';
import getEquivalencies from '@salesforce/apex/GetEquivalencies.getEq';

export default class Strengths extends LightningElement {
        //create a property
    @track strengths;

//     0: {Name: 'Apex', Skill_Equivalency__c: 100, Id: 'a005c00001ke1k4AAA'}
// 1: {Name: 'Process Automation', Skill_Equivalency__c: 94, Id: 'a005c00001ke1kTAAQ'}
// 2: {Name: 'SQL', Skill_Equivalency__c: 83, Id: 'a005c00001ke1kPAAQ'}
// 3: {Name: 'JavaScript', Skill_Equivalency__c: 78, Id: 'a005c00001ke1kOAAQ'}
// 4: {Name: 'Java', Skill_Equivalency__c: 76, Id: 'a005c00001ke1kdAAA'}
    // //create a method
    @wire(getEquivalencies)
        getStrengths({ error, data }) {
            if (data) {
                this.strengths= data;
                console.log('getStrengths', '********');
                console.log(this.strengths);
            } else if (error) {
                console.log(error);
            }
    }
    
    showEditStrengthsBoolean = false;

    //create a method
    showEditStrengthsForm() {
        console.log('showEditStrengthsForm');
        this.showEditStrengthsBoolean = true;
        //create an event
        const showEditStrengthsEvent = new CustomEvent('showeditstrengthsform');
        //dispatch the event
        this.dispatchEvent(showEditStrengthsEvent);
    }
}