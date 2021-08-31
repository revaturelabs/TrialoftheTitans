//////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  Name: titanPageLanding
//  Author: Al Waisley
//  Description: JavaScript controller for titanPageLanding
//
////////////////////////////////////////////////////////////////////////////////////////////////////

import {LightningElement, api} from 'lwc';
import IMAGES from '@salesforce/resourceUrl/TitanResources';
import getTitans from '@salesforce/apex/TitanPageApexController.getTitans';
import fetchUser from '@salesforce/apex/TitanPageApexController.fetchUser';

export default class titansPageLanding extends LightningElement {
    //helmet.png doesn't exist. Plz add thx :3
    helmetImage = IMAGES + '/TitanResources/Helmet.png';
    valkyrieImage = IMAGES + '/TitanResources/Valkyrie.gif';
    chimeraImage = IMAGES + '/TitanResources/Chimera.gif';
    hydraImage = IMAGES + '/TitanResources/Hydra.gif';
    @api titanList=[];
    @api accountInfo;

    connectedCallback(){
        getTitans()
            .then((result) =>{
                this.titanList = result;
            }).catch((error) => {
                console.error(error);
            });
        fetchUser()
            .then((result) =>{
                this.accountInfo = result;
            }).catch((error) => {
                console.error(error);
            });
    }
    navigate(event) {
        let titanDiv;
        for(let titan of this.titanList){
            titanDiv = this.template.querySelector(`[data-id="${titan.Id}"]`);
            //Adds toggle-hide class to unselected titan divs
            titanDiv.className='toggle-hide titanDiv slds-col slds-gutters slds-size_12-of-12';
        }
        titanDiv = this.template.querySelector(`[data-id="${event.currentTarget.dataset.titan}"]`);
        //Removes toggle-hide class from selected titan div
		titanDiv.className='titanDiv slds-col slds-gutters slds-size_12-of-12';
    }
    get titanListEmpty(){
        console.log("Length: " + this.titanList.length);
        return this.titanList.length == 0;
    }
}