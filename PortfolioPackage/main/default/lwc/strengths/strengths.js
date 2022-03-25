import { LightningElement, track, wire } from 'lwc';
import getEquivalencies from '@salesforce/apex/GetEquivalencies.getEq';
import EquivObj from '@salesforce/schema/Equivalency__c';
import SkillName from '@salesforce/schema/Equivalency__c.Name';
import SkillScore from '@salesforce/schema/Equivalency__c.Skill_Equivalency__c';



export default class Strengths extends LightningElement {
        //create a property
    @track strengths;
    equivObj = EquivObj;
    skillName = SkillName;
    skillScore = SkillScore;
    @track
    localStrengthsObj={};
    


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

   



    createLocalStrengthsArrayOfObjects() {
        let localStrengthsArrayOfObjects = [];
        for (let i = 0; i < this.strengths.length; i++) {
            localStrengthsArrayOfObjects.push({
                name: this.strengths[i].Name,
                score: this.strengths[i].Skill_Equivalency__c,
                id: this.strengths[i].Id
            });
        }
        this.localStrenghtsObj = localStrengthsArrayOfObjects;
    }


    connectedCallback() {
        this.createLocalStrengthsArrayOfObjects();
    }

    //create a method
    showEditStrengthsForm() {
        console.log('showEditStrengthsForm');
        this.showEditStrengthsBoolean = true;
        //create an event
        const showEditStrengthsEvent = new CustomEvent('showeditstrengthsform');
        //dispatch the event
        this.dispatchEvent(showEditStrengthsEvent);
    }

    handleUpdateSkillLevel(event) {
        // this.createLocalStrengthsArrayOfObjects();
        console.log(this.localStrengthsObj);
        console.log(this.localStrenghtsObj[0].score);
        console.log('handleUpdateSkillLevel');

        let newSkillId = event.currentTarget.dataset.skillid;
        let newSkillLevel = event.currentTarget.dataset.skilllevel;
        let newSkillInputValue = this.template.querySelector('input[data-skillid="' + newSkillId + '"]').value;
        let progressbarTarget = this.template.querySelector('c-progressbar[data-skillid="' + newSkillId + '"]');
            console.log(progressbarTarget, 'progressbarTarget');
        console.log(progressbarTarget.endwidth, 'progressbarTarget.endwidth');

            // console.log('newSkillInputValue', newSkillInputValue);
            // console.log('newSkillId', newSkillId);
            // console.log('newSkillLevel', newSkillLevel);
        progressbarTarget.endwidth = parseInt(newSkillInputValue);
        console.log(progressbarTarget.endwidth, 'progressbarTarget.endwidth');
        let localStrenghtsObj = this.createLocalStrengthsArrayOfObjects();
        console.log(localStrenghtsObj, 'localStrenghtsObj', typeof localStrenghtsObj);
        console.log(typeof(this.strengths))
        console.log(this.strengths[0], 'this.strengths', typeof(this.strengths[0]));  

        for (let i = 0; i < this.localStrengthsObj.length; i++) {
            if (this.localStrengthsObj[i].id === newSkillId) {
                console.log('found it');
                this.localStrengthsObj[i].score = newSkillInputValue;
            }
        } 
        
        console.log(this.localStrengthsObj, 'this.localStrengthsObj');
        console.log(this.localStrengthsObj[0], 'this.localStrengthsObj[0]');
        console.log(this.strengths, 'this.strengths');

    }



}