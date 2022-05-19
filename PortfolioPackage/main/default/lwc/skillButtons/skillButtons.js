import SystemModstamp from '@salesforce/schema/Account.SystemModstamp';
import { LightningElement } from 'lwc';

export default class SkillButtons extends LightningElement {
  
    
    handleClick(event){
        const label = event.target.label;
        console.log('button clicked1' + label + typeof(label));

        if (label == 'JavaScript'){
            btnJS.style.backgroundColor = '#4cae4c';
            btnJava.style.backgroundColor = 'c9302c';
            btnHTML.style.backgroundColor = 'c9302c'; 
            btnCSS.style.backgroundColor = 'c9302c';
        }
        if (label == 'Java'){
            btnJava.style.backgroundColor='#4cae4c', btnJavaScript.style.backgroundColor = 'c9302c', btnHTML.style.backgroundColor = 'c9302c', btnCSS.style.backgroundColor = 'c9302c';
        }
        if (label == 'HTML'){
            btnHTML.style.backgroundColor='#4cae4c', btnJavaScript.style.backgroundColor = 'c9302c', btnJava.style.backgroundColor = 'c9302c', btnCSS.style.backgroundColor = 'c9302c';
        }
        if (label == 'CSS'){
            btnCSS.style.backgroundColor='#4cae4c', btnJavaScript.style.backgroundColor = 'c9302c', btnJava.style.backgroundColor = 'c9302c', btnHTML.style.backgroundColor = 'c9302c';            
        }
    }
}


//window.onload = function(){}

//Changes background color of buttons to green
/*
    let btnJavaScript = document.querySelector('.btnJS');
    let btnJava = document.querySelector(".btnJava");
    let btnHTML = document.querySelector('.btnHTML');
    let btnCSS = document.querySelector('.btnCSS');

    btnJavaScript.addEventListener('click', () => btnJavaScript.style.backgroundColor='#4cae4c', btnJava.style.backgroundColor = 'c9302c', btnHTML.style.backgroundColor = 'c9302c', btnCSS.style.backgroundColor = 'c9302c');
    btnJava.addEventListener('click', () => btnJava.style.backgroundColor='#4cae4c', btnJavaScript.style.backgroundColor = 'c9302c', btnHTML.style.backgroundColor = 'c9302c', btnCSS.style.backgroundColor = 'c9302c');
    btnHTML.addEventListener('click', () => btnHTML.style.backgroundColor='#4cae4c', btnJavaScript.style.backgroundColor = 'c9302c', btnJava.style.backgroundColor = 'c9302c', btnCSS.style.backgroundColor = 'c9302c');
    btnCSS.addEventListener('click', () => btnCSS.style.backgroundColor='#4cae4c', btnJavaScript.style.backgroundColor = 'c9302c', btnJava.style.backgroundColor = 'c9302c', btnHTML.style.backgroundColor = 'c9302c');
    */

//Appends responsibilites associated with a button to a list
/*
    const button = document.getElementById("btn");
    const list = document.getElementById("list");

    list.style.display = "none";

    btnJavaScript.addEventListener("click", (event) => {
        list.style.display = "block";
    });

    btnJava.addEventListener("click", (event) => {
        list.style.display = "block";
    });

    btnHTML.addEventListener("click", (event) => {
        list.style.display = "block";
    });

    btnCSS.addEventListener("click", (event) => {
        list.style.display = "block";
    });

*/