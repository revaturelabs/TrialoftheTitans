import { api, LightningElement } from 'lwc';

export default class LwcTitanSlayer extends LightningElement {

    @api
    leadTeams; // Datatype Map(String, Map) Populates from HeroHubController -> PageContainer -> Here

    timeoutId = 1000;
    intervalId = 10000;

    animation;
    titanTimeout;

    /*
    Incomplete connectedCallback not functional sets up the intervals to cycle through top scores in each team/cohort/squad

    connectedCallback() {
        
        this.animation = window.setInterval (() => {
            const lwcTitanSlayer = document.querySelector('.lwcTitanSlayer');
            titanSlayer.classList.toggle('hide');
            this.titanTimeout = window.setTimeout (() => {
                lwcTitanSlayer.classList.toggle('switch');
                lwcTitanSlayer.classList.toggle('hide');
            }, timeoutId);
        }, intervalId)
    } 

    */
    

    /*
    
    Event unimplemented in aura component as well

    handleClear (component, event, helper) {
        console.log('from handleclear');
        window.clearInterval(component.get("v.setIntervalId"));
        component.set("v.setIntervalId", null);
        window.clearTimeout(component.get('v.setTimeoutId'));
        component.set("v.setTimeoutId", null);
    }
    */

    logInterval (component) {
        console.log(component.get("v.setIntervalId"));
    }
}