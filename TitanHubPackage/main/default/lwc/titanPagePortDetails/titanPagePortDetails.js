/*

    Author: Andrew Emond
    Description: Component for diplaying Portfolio information on the titan page.
    Date Created: 1/25/21

*/

import getEquiv from '@salesforce/apex/titanPagePortDetailsHelper.getEquiv';
import getExamInfo from '@salesforce/apex/titanPagePortDetailsHelper.getExamInfo';                 //Import statements for apex class and LDS form
import getProjectInfo from '@salesforce/apex/titanPagePortDetailsHelper.getProjectInfo';
import getSkillsInfo from '@salesforce/apex/titanPagePortDetailsHelper.getSkillsInfo';
//import obtainExperience from '@salesforce/apex/titanPagePortDetailsHelper.obtainExperience';         //Ignore this or delete it
import equivObject from '@salesforce/schema/Equivalency__c'
import equivField from '@salesforce/schema/Equivalency__c.Skill_Equivalency__c'
import { LightningElement,wire,api,track } from 'lwc';

export default class TitanPagePortDetails extends LightningElement {
@api recordId;                                                                  //One way you could tell the component what titan it is currently working with.  We never ironed out how to do this.   
@api titanId = 'a0X5f000001vStqEAE';                                             //Hard coded at the moment. Undo the hard code, its supposed to be for telling the component what the titan is.           
@wire(getSkillsInfo, {titanId: '$titanId'}) skillInfo;                         //Wire functions for pulling org data. Takes in the titan as a parameter.
@wire(getEquiv, {titanId: '$titanId'}) equivInfo;
@wire(getExamInfo, {titanId: '$titanId'}) examInfo;
@wire(getProjectInfo) projectInfo;
numberForApex;
//@wire(obtainExperience, {i: '$numberForApex'})  expToApex;             //Ignore this too
skillName;                                                              //variables I instatiated before refering to them in functions
equivId;
skillType;                             
skillDesc;
inputEquiv;
trueEquiv;
tEquivCalc;
projectCalc=0;                              //These two varriables are instatied at 0 because they will be used in calculations.
examCalc=0;
objectApiName=equivObject
equiv=equivField
/*get options() {                             //From when I tried to use an Apex class to submit equivalence. Ignore and delete.
    return [
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '7', value: '7' },
        { label: '8', value: '8' },
        { label: '9', value: '9' },
        { label: '10', value: '10' },
        { label: '11', value: '11' },
        { label: '12', value: '12' },
        { label: '13', value: '13' },
        { label: '14', value: '14' },
        { label: '15', value: '15' },
        { label: '16', value: '16' },
        { label: '17', value: '17' },
        { label: '18', value: '18' },
        { label: '19', value: '19' },
        { label: '20', value: '20' },
        { label: '21', value: '21' },
        { label: '22', value: '22' },
        { label: '23', value: '23' },
        { label: '24', value: '24' },
    ];
}*/
/*handleChange(event) {
    this.value = event.detail.value;
    this.numberForApex=parseInt(event.detail.value)
}*/

renderedCallback(){           
    console.log(this.skillInfo.data)                                                   //For displaying the data when the component loads in
    if(this.skillInfo.data && this.equivInfo.data && this.projectInfo.data){           //to prevent JS errors from using renderedCallback
        console.log(this.equivInfo.data[0].Id)
        this.projectCalc=this.projectInfo.data.length*6           // Used for calculating equivalency, change the number to one you see fit.
        if(this.examInfo.data){                                   //If you dont pull any exams(or the class is broken) it doesnt break the whole component
            this.examCalc=this.examInfo.data.length*2             // Also used for calculating equivalency. I wanted to iron out these more. Bad pieces because they are not related
        }                                                         // to the skill or titan, just the user. With more time I wanted to change the data model for better relationships.
        this.equivId=this.equivInfo.data[0].Id                    // A lot of data binding for the HTML.                            
        this.tEquivCalc=this.projectCalc+this.examCalc                      
        this.skillName="Titan Skill: "+this.skillInfo.data[0].Name         
        this.skillType="Titan Skill Type: "+this.skillInfo.data[0].Skill_Type__c
        this.skillDesc="Titan Skill Description: "+this.skillInfo.data[0].Skill_Breakdown__c
        this.inputEquiv= "Your Personal Equivalence: "+ this.equivInfo.data[0].Skill_Equivalency__c +" Months"
        this.trueEquiv= "Calculated Equivalence: " + this.tEquivCalc+" Months"
    }
}

}
