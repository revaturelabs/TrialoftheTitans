/** 
 * Created by Sean Whitley 3/16/22
 * cookie-crisp#3847
 * sean.whitley@revature.net
 */

import { LightningElement, wire } from 'lwc';
import { getHeroInfo } from "@salesforce/apex/HeroInfoHelper.getHeroInfo";

export default class PortfolioHub_HeroInfoComponent extends LightningElement {


    // Hero info properties for wire service response
    error;                      // populated if error occurs in apex call
    
    profileImgSrc;              // Url to profile image resource    (Job__c.User__r.MediumPhotoUrl)
    heroName;                   // Name to display                  (Job__c.User__r.Name)
    heroTitle;                  // Prospective job title            (Job__c.Name)
    approvalStatus = true;      // TODO: Status of submitted portfolio (boolean) 
    
    /**
     * Get Hero info from org
     *      profile img source
     *      hero name
     *      hero job title
     *      (portfolio approval status)
     * 
     * SOQL: 
     *  [SELECT Name,User__r.MediumPhotoUrl,User__r.Name FROM Job__c]
     */
    @wire(getHeroInfo) 
    heroInfo({ error, data }) {
        if (error) {
            this.error = error;
            // TODO: Handle error
        }

        // If there's no error, data will be returned
        this.profileImgSrc  = data.User__r.MediumPhotoUrl;
        this.heroName       = data.User__r.Name;
        this.heroTitle      = data.Name;
        this.approvalStatus = data.approvalStatus;
    }
}