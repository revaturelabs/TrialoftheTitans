import { LightningElement, wire, api } from 'lwc';

import RETURN_NAMES from '@salesforce/apex/lwcPortFolioIndustryEquivs.returnSkillNames';
import APEX_ID from '@salesforce/apex/lwcPortFolioIndustryEquivs.returnId';
import NAME_FIELD from '@salesforce/schema/Equivalency__c.Name';
import EQUIV_FIELD from '@salesforce/schema/Equivalency__c.Skill_Equivalency__c';
import EQUIV_ID from '@salesforce/schema/Equivalency__c.id';
import EQUIV_OBJ from '@salesforce/schema/Equivalency__c';

export default class LwcPortfolioIndustryEquivs extends LightningElement {
    @api recordId
    @api objectApiName
    
    isEdit = false;
    recordId = EQUIV_ID;
    objectApiName = EQUIV_OBJ;
    name = NAME_FIELD;
    equiv = EQUIV_FIELD;
    
    //get skill names and skill months
    @wire(RETURN_NAMES) NameList;
    @wire(APEX_ID) recordIdList;

    //swap between view and edit mode
    edit(event){
        this.isEdit = !this.isEdit;
    }

    handleSuccess(){
        const toastEvent = new ShowToastEvent({
            title: "Saved",
            message: "Record Saved",
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
    }
}

