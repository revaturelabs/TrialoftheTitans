import { LightningElement, track, wire } from 'lwc';
import getEquivalencies from '@salesforce/apex/GetEquivalencies.getEq';
import EquivObj from '@salesforce/schema/Equivalency__c';
import SkillName from '@salesforce/schema/Equivalency__c.Name';
import SkillScore from '@salesforce/schema/Equivalency__c.Skill_Equivalency__c';
import setEquivalencies from '@salesforce/apex/GetEquivalencies.setEq';
import {refreshApex} from '@salesforce/apex';




export default class Strengths extends LightningElement {
        //create a property
    @track strengths;
    equivObj = EquivObj;
    skillName = SkillName;
    skillScore = SkillScore;
    @track
    localStrengthsArrayOfObjs;
    @track
    wireStrengthsValue;
    


//     0: {Name: 'Apex', Skill_Equivalency__c: 100, Id: 'a005c00001ke1k4AAA'}
// 1: {Name: 'Process Automation', Skill_Equivalency__c: 94, Id: 'a005c00001ke1kTAAQ'}
// 2: {Name: 'SQL', Skill_Equivalency__c: 83, Id: 'a005c00001ke1kPAAQ'}
// 3: {Name: 'JavaScript', Skill_Equivalency__c: 78, Id: 'a005c00001ke1kOAAQ'}
// 4: {Name: 'Java', Skill_Equivalency__c: 76, Id: 'a005c00001ke1kdAAA'}
    // //create a method
    @wire(getEquivalencies)
        getStrengths(strengthValue) {
            const { error, data } = strengthValue;
            this.wireStrengthsValue = strengthValue;
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

    handleShowEditStrengthsForm() {
        console.log('handleShowEditStrengthsForm');
        this.showEditStrengthsBoolean = true;
    }


    handleUpdateSkillLevel(event) {

        // this.createLocalStrengthsArrayOfObjects();
        console.log(this.localStrengthsArrayOfObjs);
        console.log(this.localStrengthsArrayOfObjs[0].score);
        console.log('handleUpdateSkillLevel');

        let newSkillId = event.currentTarget.dataset.skillid;
        console.log(newSkillId, 'newSkillId');
        // let newSkillLevel = event.currentTarget.dataset.skilllevel;
        let newSkillInputValue = this.template.querySelector('input[data-skillid="' + newSkillId + '"]').value;
        let progressbarTarget = this.template.querySelector('c-progressbar[data-skillid="' + newSkillId + '"]');
            console.log(progressbarTarget, 'progressbarTarget');
        console.log(progressbarTarget.endwidth, 'progressbarTarget.endwidth');

        // newSkillInputValue = parseInt(newSkillInputValue);

        setEquivalencies({eq: newSkillInputValue, eqId: newSkillId});
        refreshApex(this.wireStrengthsValue);

            // console.log('newSkillInputValue', newSkillInputValue);
            // console.log('newSkillId', newSkillId);
            // console.log('newSkillLevel', newSkillLevel);
        progressbarTarget.endwidth = parseInt(newSkillInputValue);
        console.log(progressbarTarget.endwidth, 'progressbarTarget.endwidth');

        // for (let i = 0; i < this.localStrengthsArrayOfObjs.length; i++) {
        //     if (this.localStrengthsArrayOfObjs[i].id === newSkillId) {
        //         console.log('found it');
        //         this.localStrengthsArrayOfObjs[i].score = newSkillInputValue;
        //     }
        // } 
        

    }



}