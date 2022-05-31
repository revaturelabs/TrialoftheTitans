/** 
 * Created by Sean Whitley 3/16/22
 * cookie-crisp#3847
 * sean.whitley@revature.net
 */

import { LightningElement, wire, track } from 'lwc';
import NAME_FIELD from "@salesforce/schema/User.Name";
import { refreshApex } from "@salesforce/apex";
import getBasicUserInfo from "@salesforce/apex/UserInfoHelper.getBasicUserInfo";
import getCertifications from "@salesforce/apex/UserInfoHelper.getCertifications";
import getTeamInfo from '@salesforce/apex/headerHelper.getTeamInfo';
import getTechInfo from '@salesforce/apex/headerHelper.getTechInfo';   

export default class PortfolioHub_HeroInfoComponent extends LightningElement {

    // Conditional rendering
    isEditing = false;
    isShowingCertList = false;
    isCertListEmpty = true;

    //to change the background color behind the hero info section
    teamName;
    teamColor;
    colorForBack="background-color: gray;";

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
            this.profileImgSrc  = data.FullPhotoUrl;

            if (data.Title) {
                this.heroTitle  = data.Title;
            } else {
                this.heroTitle  = 'Hero-in-Training';
            }
            console.log(this.heroTitle);
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
            this.isCertListEmpty = this.certList.length > 0;
        } else {
            console.error(error);
        }
    }

    //to change the background color behind the hero info section
    @wire(getTeamInfo) teamInfo;
    @wire(getTechInfo) techInfo;
        
    // Handle edit button for name
    handleEditName() {
        this.toggleModalView();
    }

    // Conditional rendering for cert list
    toggleCertList() {
        this.isShowingCertList = !this.isShowingCertList;
    }
    
    // When submit button is clicked on lightning-record-edit-form
    handleSubmit() {
        this.toggleModalView();
        refreshApex(this.wireResponse);
    }
    
    // Show/hide modal with edit form
    toggleModalView() {
        this.isEditing = !this.isEditing;
    }

    //rendered callback function to change the background color of the about me section
    renderedCallback(){
        if(this.teamInfo.data && this.techInfo){
            console.log('test');
            this.teamName=this.teamInfo.data[0].Name
            this.teamColor=this.teamInfo.data[0].Primary_Color__c
            this.colorForBack="background-color: "+this.teamColor +";";
        }  
    }
}