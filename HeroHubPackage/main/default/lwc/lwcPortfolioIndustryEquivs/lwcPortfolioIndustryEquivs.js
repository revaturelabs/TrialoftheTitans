import { LightningElement, wire, api } from 'lwc';

import RETURN_NAMES from '@salesforce/apex/lwcPortFolioIndustryEquivs.returnSkillNames';

export default class LwcPortfolioIndustryEquivs extends LightningElement {
isEdit = false;

//get skill names and skill months
@wire(RETURN_NAMES) NameList;


 //swap between view and edit mode
edit(event){
    this.isEdit = !this.isEdit;
}
}

