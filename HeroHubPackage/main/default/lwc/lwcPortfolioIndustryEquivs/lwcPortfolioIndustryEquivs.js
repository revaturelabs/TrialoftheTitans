import { LightningElement, api, wire } from 'lwc';

import Return_Names from '@salesforce/apex/lwcPortFolioIndustryEquivs.returnSkillNames';
import GET_MONTHS from '@salesforce/apex/PortfolioIndustryEquivsController.ReturnMonths';

import Id from '@salesforce/user/Id';

export default class LwcPortfolioIndustryEquivs extends LightningElement {
isEdit = false;
userId = Id;
//get current user id.  may need to pass it to the apex controller? 



NameData = [];  //empty array to hold data from skill list

 @wire(Return_Names) NameList;
 populateData({error, data}){
     if(data){
         this.data = NameData;
     }
 }





edit(event){
    this.isEdit = !this.isEdit;
}

}

