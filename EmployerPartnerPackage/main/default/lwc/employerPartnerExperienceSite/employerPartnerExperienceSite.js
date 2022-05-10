import { LightningElement, wire, track} from 'lwc';
import getHeroInfo from '@salesforce/apex/EmployerPartnerExperienceSiteHelper.getHeroInfo';
export default class EmployerPartnerExperienceSite extends LightningElement {
    
    @track heroes=[];
    @wire (getHeroInfo)     
    wiredAccount({ error, data }) {
        if (data) {
            for (let i = 0; i < data.length; i++) {
                this.heroes.push(JSON.parse(data[i]));
                console.log(JSON.parse(data[i]));
            }
        }
    }
    
}