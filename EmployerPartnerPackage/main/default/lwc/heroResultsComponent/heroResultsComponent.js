import { LightningElement, track , api} from 'lwc';

export default class HeroResultsComponent extends LightningElement {
    //This is being grabbed from employerPartnerExperience
    @api heroes;

}