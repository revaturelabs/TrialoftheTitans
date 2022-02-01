////javascript based on Chris Eng's whiteboarding posted on Discord on 01/19th and goes with the single button version///
{ LightningElement,wire,track } from 'lwc';
import CreateCurriculum from '@salesforce/apex/ApexDataFactory.CreateCurriculum';
import CreateTitan from '@salesforce/apex/ApexDataFactory.CreateTitan';
import CreateSkill from '@salesforce/apex/ApexDataFactory.CreateSkill';
import CreateCohort from '@salesforce/apex/ApexDataFactory.CreateCohort';
import CreateTeam from '@salesforce/apex/ApexDataFactory.CreateTeam';
import CreateSquad from '@salesforce/apex/ApexDataFactory.CreateSquad';
import CreateAccount from '@salesforce/apex/ApexDataFactory.CreateAccount';







export default class LwcDataFactory extends LightningElement{
    handleClick(){
        CreateCurriculum();  
        CreateCohort();
        CreateTeam();
        CreateSquad();
        CreateAccount();
        CreateTitan();
        CreateSkill();
        

    }
}

