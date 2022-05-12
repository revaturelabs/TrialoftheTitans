import { LightningElement, wire, track } from 'lwc';
import getHeroInfo from '@salesforce/apex/EmployerPartnerExperienceSiteHelper.getHeroInfo';
export default class EmployerPartnerExperienceSite extends LightningElement {

    @track heroes = [];
    @track filteredHeroes;
    @track queryTerm;
<<<<<<< HEAD
    @track pages = {};
    @track currentPage = 1;
    @track currentHeroes = [];
=======

>>>>>>> 02c22b4efe4eb6343557819edb673f018ed40fcd


    @wire(getHeroInfo)
    wiredHero({ error, data }) {
        if (data) {
            for (let i = 0; i < data.length; i++) {

                this.heroes.push(JSON.parse(data[i]));

            }
            this.filteredHeroes = this.heroes;
        }
    }
<<<<<<< HEAD

    handleFilterEvent(event) {
        this.filteredHeroes = event.detail;
    }
=======
>>>>>>> 02c22b4efe4eb6343557819edb673f018ed40fcd
}