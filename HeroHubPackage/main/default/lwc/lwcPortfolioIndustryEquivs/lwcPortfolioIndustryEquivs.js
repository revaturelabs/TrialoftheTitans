import { LightningElement, api, wire } from 'lwc';
import getSkillList from '@salesforce/apex/lwcPortFolioIndustryEquivs.getSkillList';





export default class LwcPortfolioIndustryEquivs extends LightningElement {
isEdit = false;

data = [];  //empty array to hold data from skill list
@wire(getSkillList) skillList;
populateData({error, data}){
    if(data){
        this.data = data;
    }
}




}

//skillList