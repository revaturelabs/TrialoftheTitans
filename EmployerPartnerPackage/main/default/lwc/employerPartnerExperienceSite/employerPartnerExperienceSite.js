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

    Pending modifications so that heroes can be sorted
*/
export default class EmployerPartnerExperienceSite extends LightningElement {
    /**
        heroes: our original input of heroes defined by our wire call
        filterHeroes: In our second stage we should filter the heroes
        sortedHeroes: this should be a list of our filterdHeroes after our sorting logic is returned
        msg: input from heroSearch component

        Needs Implementation:
        remote: Also input from our search component indicate if the user is willing to work remotely
        relocate: similar to remote, excpet indicates willingnes to relocate

    */
    @track heroes = [];
    @track filteredHeroes;
    @track sortedHeroes;
    @track msg = '';
    @track remote;
    @track relocate;

    /**
        Our wire call that gets our heroes
    */
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
    /**
        When the filter is updated this event is fired
        filters the components and changes a list for those who don't meet it
    */
    handlefilterevent(event) {
        this.filteredHeroes = event.detail;
    }
        handleCustomEvent(evt){
    
        this.msg = evt.detail.query;
        this.remote = evt.detail.remote;
        this.relocate = evt.detail.relocate;
    
    }
    /**
        DOES NOT WORK!!!
        This needs to be worked on with the sort component in order to implement sorting 
        functionality
    */
    handlesortevent(event){
        this.sortedHeroes=event.detail;
    }    
}