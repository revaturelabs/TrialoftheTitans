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
    
    @api activeTitan;
    skillsList=[];

    connectedCallback(){
        getSkills({titanId : this.activeTitan.Id})
            .then((result) => {
                this.skillsList = result;
            }).catch((error) => {
                console.error(error);
            });
    }
    get skillsListEmpty(){
        return this.skillsList.length == 0;
    }
    get lightningCardTitle(){
        return this.activeTitan.Name + ' Skills';
    }
}