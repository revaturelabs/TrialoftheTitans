import { LightningElement, wire, track } from 'lwc';
import getHeroInfo from '@salesforce/apex/EmployerPartnerExperienceSiteHelper.getHeroInfo';
export default class EmployerPartnerExperienceSite extends LightningElement {

    @track heroes = [];
    @track filteredHeroes;
    @track queryTerm;
<<<<<<< HEAD
=======
    @track pages = {};
    @track currentPage = 1;
    @track currentHeroes = [];
>>>>>>> df02b8395bf285545f19ed46e9844fe3cddde1e8


    @wire(getHeroInfo)
    wiredHero({ error, data }) {
        if (data) {
            for (let i = 0; i < data.length; i++) {

                this.heroes.push(JSON.parse(data[i]));

            }
            this.filteredHeroes = this.heroes.slice();
        }
    }

    handleFilterEvent(event) {
        this.filteredHeroes = event.detail;
    }
}