/** 
 * Created by Sean Whitley 3/16/22
 * cookie-crisp#3847
 * sean.whitley@revature.net
 */

import { LightningElement, wire, track } from 'lwc';
import getBasicUserInfo from "@salesforce/apex/UserInfoHelper.getBasicUserInfo";

export default class PortfolioHub_HeroInfoComponent extends LightningElement {

    // Conditional rendering
    isEditing = false;

    // record-edit-form
    objectApiName = 'User';
    recordId; // from Wire

    // Hero info properties for wire service response
    error;                      // populated if error occurs in apex call
    
    @track profileImgSrc;               // Url to profile image resource    (User.FullPhotoUrl)
    @track heroName;                    // Name to display                  (User.Name)
    @track heroTitle;                   // Prospective job title            (Account?)
    @track certification;               // If user has certification, show under name/title
    
    /**
     * Get Hero info from org
     *      profile img source
     *      hero name
     *      hero job title?
     * 
     * SOQL: 
     *  [SELECT Id,Name,FullPhotoUrl FROM User LIMIT 1][0]
     */
    @wire(getBasicUserInfo) 
    getHeroInfo({ error, data }) {
        if (error) {
            this.error = error;
            console.log(error);
            // TODO: Handle error
        } else if (data) {
            // If there's no error, data will be returned
            console.log(data);
    
            this.recordId       = data.Id;
            this.heroName       = data.Name;
            this.heroTitle      = data.Title;
            this.profileImgSrc  = data.FullPhotoUrl;
        }
    }

    // Handle edit button for name
    handleEditName() {
        // Toggle isEditing
        this.isEditing = !this.isEditing;
    }
}