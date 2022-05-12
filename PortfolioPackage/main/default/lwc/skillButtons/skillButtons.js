import SystemModstamp from '@salesforce/schema/Account.SystemModstamp';
import { LightningElement } from 'lwc';

export default class SkillButtons extends LightningElement {}

var buttonClicked = null;

function highlight(id) {
    if(buttonClicked != null) {
        buttonClicked.style.background = "#cccccc";
        buttonClicked.style.color =  "black";
    }

    buttonClicked = document.getElementById(id);
    buttonClicked.style.background =  "#87ceeb";
    buttonClicked.style.color =  "white";    

}

function filterSkills(){
    if (buttonClicked){
        responsibility.getElementById('Responsibility').innerHTML = "Clicked";
    }
}


