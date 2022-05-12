import { LightningElement, wire, track} from 'lwc';
import getHeroInfo from '@salesforce/apex/EmployerPartnerExperienceSiteHelper.getHeroInfo';
export default class EmployerPartnerExperienceSite extends LightningElement {
    
    @track heroes=[];
    @track filteredHeroes;
    @track queryTerm;



    @wire (getHeroInfo)     
    wiredHero({ error, data }) {
        if (data) {
            for (let i = 0; i < data.length; i++) {
                
                this.heroes.push(JSON.parse(data[i]));

            }
            this.filteredHeroes= this.heroes;
        }
    }
}