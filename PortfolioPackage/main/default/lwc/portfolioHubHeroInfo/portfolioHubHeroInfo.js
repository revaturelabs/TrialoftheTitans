/** 
 * Created by Sean Whitley 3/16/22
 * cookie-crisp#3847
 * sean.whitley@revature.net
 */

import { LightningElement, wire } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Contact.Name';
import getBasicUserInfo from "@salesforce/apex/UserInfoHelper.getBasicUserInfo";

export default class PortfolioHub_HeroInfoComponent extends LightningElement {

    // Conditional rendering
    isEditing = false;

    // record-edit-form
    objectApiName = 'User';
    recordId; // from Wire
    nameField = NAME_FIELD;

    // Hero info properties for wire service response
    error;                      // populated if error occurs in apex call
    
    profileImgSrc;              // Url to profile image resource    (User.FullPhotoUrl)
    heroName;                   // Name to display                  (User.Name)
    heroTitle;                  // Prospective job title            (User__r.Contact.Title)
    
    /**
     * Get Hero info from org
     *      profile img source
     *      hero name
     *      hero job title?
     * 
     * SOQL: 
     *  [SELECT Id,Name,FullPhotoUrl,Contact__r.Title,Cohort__c.]
     */
    @wire(getBasicUserInfo) 
    getHeroInfo({ error, data }) {
        if (error) {
            this.error = error;
            // TODO: Handle error
        }
        // If there's no error, data will be returned
        this.recordId       = data.Id;
        this.heroName       = data.Name;
        this.heroTitle      = data.Title;
        this.profileImgSrc  = data.FullPhotoUrl;
    }

    // Handle edit button for name
    handleEditName() {
        // Toggle isEditing
        this.isEditing = !this.isEditing;
    }
}