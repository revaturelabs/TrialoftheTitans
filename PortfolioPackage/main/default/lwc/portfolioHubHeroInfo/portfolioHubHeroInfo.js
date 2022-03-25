/** 
 * Created by Sean Whitley 3/16/22
 * cookie-crisp#3847
 * sean.whitley@revature.net
 */

import { LightningElement, wire, track } from 'lwc';
import getBasicUserInfo from "@salesforce/apex/UserInfoHelper.getBasicUserInfo";
import getCertifications from "@salesforce/apex/UserInfoHelper.getCertifications";
import NAME_FIELD from "@salesforce/schema/User.Name";
import { refreshApex } from "@salesforce/apex";

export default class PortfolioHub_HeroInfoComponent extends LightningElement {

    // Conditional rendering
    isEditing = false;

    // record-edit-form
    objectApiName = 'User';
    recordId; // from Wire
    nameField = NAME_FIELD;

    // Hero info properties for wire service response
    wireResponse;                       // Holds data from wire to refresh with refreshApex()

    @track profileImgSrc;               // Url to profile image resource    (User.FullPhotoUrl)
    @track heroName;                    // Name to display                  (User.Name)
    @track heroTitle;                   // Prospective job title            (Account?)
    @track certList;                    // If user has certification, show under name/title
    
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
    getHeroInfo(value) {
        this.wireResponse = value;

        const { error, data } = value;

        if (data) {
            // If there's no error, data will be returned
            console.log(data);
            
            this.recordId       = data.Id;
            this.heroName       = data.Name;
            // this.heroTitle      = data.Title;
            this.profileImgSrc  = data.FullPhotoUrl;
        } else if (error) {
            this.error = error;
            console.log(error);
        }
    }

    /**
     * Get certification data from org
     *      Image Url
     *      Name
     *      Date Issued
     * 
     * SOQL: 
     *  [
            SELECT Image_URL__c,Certification_Exam__r.Name,Date_Issued__c 
            FROM Certification__c 
            WHERE User__c = :uid
        ]
     */
    @wire(getCertifications)
    certifications({ error, data }) {
        if (data) {
            console.log(data);
            this.certList = data;
        } else if (error) {
            console.error(error);
        }
    }

    // Handle edit button for name
    handleEditName() {
        this.toggleModalView();
    }
    
    handleSubmit() {
        this.toggleModalView();
        refreshApex(this.wireResponse);
    }
    
    toggleModalView() {
        // Toggle isEditing
        this.isEditing = !this.isEditing;
    }
}