//////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  Name: titanPageLanding
//  Author: Al Waisley
//  Description: JavaScript controller for titanPageLanding
//
////////////////////////////////////////////////////////////////////////////////////////////////////

import {LightningElement, api} from 'lwc';
import HELMET_IMG from '@salesforce/resourceUrl/TitanResources/Helmet.png';
import VALKYRIE_IMG from '@salesforce/resourceUrl/TitanResources/Valkyrie.gif';
import CHIMERA_IMG from '@salesforce/resourceUrl/TitanResources/Chimera.gif';
import HYDRA_IMG from '@salesforce/resourceUrl/TitanResources/Hydra.gif';
import getTitans from '@salesforce/apex/TitanPageApexController.getTitans';
import fetchUser from '@salesforce/apex/TitanPageApexController.fetchUser';

export default class titansPageLanding extends LightningElement {
    helmetImage = HELMET_IMG;
    valkyrieImage = VALKYRIE_IMG;
    chimeraImage = CHIMERA_IMG;
    hydraImage = HYDRA_IMG;
    @api titanList;
    @api accountInfo;
    error;

    connectedCallback(){
        console.log("In connectedCallback");
        getTitans().LightningElement(result =>{
            console.log("LWC Returned Titans: ")
            console.log(result)
            this.titanList = result;
        }).catch(error => {
            console.log(error);
            this.error=error;
        })
        fetchUser().LightningElement(result =>{
            console.log("CURRENT USER: " + result);
            this.accountInfo = result;
        }).catch(error => {
            console.log(error);
            this.error=error;
        })
    }
    navigate(event) {
        console.log("LWC navigate function:");
        console.log(this.titanList);
        for(let titan in titanList){
            let titanId = titanList[titan].Id;
            console.log('Selected Titan Id:' + titanId);            
            let titanDiv = document.getElementById(titanId);
            console.log('titanDiv:' + titanDiv);
            this.template.querySelector('[data-id="titan-div"]').className='toggle-hide titanDiv slds-col slds-gutters slds-size_12-of-12';
        }
        let titanId = event.currentTarget.dataset.titan;
        console.log('Current Titan Id:' + titanId);
        let titanDiv = document.querySelector("#" + titanId);
		this.template.querySelector('[data-id="titan-div"]').className='titanDiv slds-col slds-gutters slds-size_12-of-12';
    }
    get titanListEmpty(){
        console.log("Length: " + this.titanList.length);
        return this.titanList.length == 0;
    }    
}