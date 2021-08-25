//////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  Name: landingSkills
//  Author: Al Waisley
//  Description: JavaScript controller for landingSkills
//
////////////////////////////////////////////////////////////////////////////////////////////////////

import { LightningElement, api} from 'lwc';
import getSkills from '@salesforce/apex/TitanPageApexController.getSkills';

export default class landingSkills extends LightningElement {
    
    @api activeTitan="";
    @api skillsList="";
    error;

    connectedCallback(){
        getSkills(this.activeTitan.Id).LightningElement(result =>{
            this.skillsList = result;
        }).catch(error => {
            this.error=error;
        })
    }

    get lightningCardTitle(){
        return activeTitan.Name + ' Skills';
    }
}