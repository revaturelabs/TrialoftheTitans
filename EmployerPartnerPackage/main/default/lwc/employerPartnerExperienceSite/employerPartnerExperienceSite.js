import { LightningElement, wire, track } from 'lwc';
import getHeroInfo from '@salesforce/apex/EmployerPartnerExperienceSiteHelper.getHeroInfo';
/*
  @description       : Creates a page to display portfoloios for empoyers with search fucntions
  @author            : Carlos Concepcion, Johnny Tran, Daniel Alcala, Theodore Moore, Quan Nguyen
  @group             : 
  @last modified on  : 05-12-2022
  @last modified by  : Quan Nguyen
  Modifications Log
  Ver   Date         Author                Modification
  1.0   05-10-2022   Theodore Moore          Initial Version
  1.1   05-12-2022   Quan Nguyen             Add filter component and handleFilterEvent method
  1.2   05-13-2022   Theodore Moore          Add search bar and unworking sort buttons
*/
export default class EmployerPartnerExperienceSite extends LightningElement {

    @track heroes = [];
    @track filteredHeroes;
    @track sortedHeroes;
    @track queryTerm;
    @track msg = '';
    @track remote;
    @track relocate;


    @wire(getHeroInfo)
    wiredHero({ error, data }) {
        if (data) {
            for (let i = 0; i < data.length; i++) {

                this.heroes.push(JSON.parse(data[i]));

            }
            this.filteredHeroes = this.heroes.slice();
            this.sortedHeroes= this.heroes.slice();
        }
    }

    handlefilterevent(event) {
        this.filteredHeroes = event.detail;

    }
        handleCustomEvent(evt){
    
        this.msg = evt.detail.query;
        this.remote = evt.detail.remote;
        this.relocate = evt.detail.relocate;
    
    }
    handlesortevent(event){
        this.sortedHeroes=event.detail;
    }    
}