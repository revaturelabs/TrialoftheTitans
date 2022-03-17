/** 
 * Created by Sean Whitley 3/16/22
 * cookie-crisp#3847
 * sean.whitley@revature.net
 */

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
    //      [SELECT User__r.MediumPhotoUrl,User__r.Name,Name FROM Job__c]
    // @wire(getHeroInfo)
    heroInfo({ error, data }) {
        if (error) {
            this.error = error;
            // TODO: Handle error
        }

        // If there's no error, data will be returned
        this.profileImgSrc  = data.MediumPhotoUrl;
        this.heroName       = data.Name;
        this.heroTitle      = data.heroTitle;
        this.approvalStatus = data.approvalStatus;
    }
}