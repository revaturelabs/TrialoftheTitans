import { LightningElement, wire, track } from 'lwc';
import getHeroInfo from '@salesforce/apex/EmployerPartnerExperienceSiteHelper.getHeroInfo';
export default class EmployerPartnerExperienceSite extends LightningElement {

    @track heroes = [];
    @track filteredHeroes;
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
}