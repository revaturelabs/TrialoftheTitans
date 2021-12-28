import { LightningElement, wire, api } from 'lwc';

import RETURN_NAMES from '@salesforce/apex/lwcPortFolioIndustryEquivs.returnSkillNames';
import Id from '@salesforce/user/Id'; //check User Id on page for debug

export default class LwcPortfolioIndustryEquivs extends LightningElement {
isEdit = false;
userId = Id;





//get skill names and skill months
@wire(RETURN_NAMES) NameList;



 //swap between view and edit mode
edit(event){
    this.isEdit = !this.isEdit;
}
}

