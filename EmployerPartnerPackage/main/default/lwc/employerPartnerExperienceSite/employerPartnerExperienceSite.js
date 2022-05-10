import { LightningElement, wire } from 'lwc';
import getHeroInfo from '@salesforce/apex/EmployerPartnerExperienceSiteHelper.getHeroInfo';
export default class EmployerPartnerExperienceSite extends LightningElement {
    @wire (getHeroInfo) heroesPre;
    heroes=[];
    EmployerPartnerExperienceSite(){
        for (let i = 0; i < heroesPre.length; i++) {
            heroes.push(JSON.parse(heroesPre[i]));
        }
        alert(this.heroes);
    }

}