import { LightningElement, wire } from 'lwc';

export default class PortfolioHub_HeroInfoComponent extends LightningElement {


    // Hero info properties for wire service response
    error;              // populated if error occurs in apex call
    
    profileImgSrc;      // Url to profile image resource
    heroName;           // Name to display
    heroTitle;          // Prospective job title
    approvalStatus;     // Status of submitted portfolio (boolean)
    
    /**
     * Get Hero info from org
     *      profile img source
     *      hero name
     *      hero job title
     *      (portfolio approval status)
     */
    // TODO: Define Apex method for data retrieval
    // @wire(getHeroInfo)
    heroInfo({ error, data }) {
        if (error) {
            this.error = error;
            // TODO: Handle error
        }

        // If there's no error, data will be returned
        this.profileImgSrc  = data.profileImgSrc;
        this.heroName       = data.heroName;
        this.heroTitle      = data.heroTitle;
        this.approvalStatus = data.approvalStatus;
    }
}