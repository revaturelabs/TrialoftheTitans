import { LightningElement, track , api} from 'lwc';

export default class HeroResultsComponent extends LightningElement {
    //This is being grabbed from employerPartnerExperience
    @api heroes;
    
    handleCustomEvent(evt){
        const textTest = evt.detail;
        this.msg = textTest;
        
    }

}