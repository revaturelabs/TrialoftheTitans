import { LightningElement, api, wire, track  } from 'lwc';
import getBasicUserInfo from '@salesforce/apex/UserInfoReadOnlyHelper.getBasicUserInfo';
import getCertifications from '@salesforce/apex/UserInfoReadOnlyHelper.getCertifications';
import getTeamInfo from '@salesforce/apex/headerHelper.getTeamInfo';
import getTechInfo from '@salesforce/apex/UserInfoReadOnlyHelper.getTechInfo';
import uld from '@salesforce/user/Id';
export default class ReadOnlyHeroInfo extends LightningElement {


@api uid;


teamName;
teamColor;
colorForBack="background-color: gray;";

@track profileImgSrc;               // Url to profile image resource    (User.FullPhotoUrl)
@track heroName;                    // Name to display                  (User.Name)
@track heroTitle;                   // Prospective job title            (Account?)
@track certList;                    // If user has certification, show under name/title


//replace when complete
@wire (getBasicUserInfo, {uid: "$uid"})
getHeroInfo(value) {

        const { error, data } = value;

        if (data) {
            // If there's no error, data will be returned
            console.log(data);
            
            this.userID       = data.Id;
            this.heroName       = data.FirstName+ ' '+ data.LastName;
            this.profileImgSrc  = data.FullPhotoUrl;

            if (data.Title) {
                this.heroTitle  = data.Title;
            } else {
                this.heroTitle  = 'Hero-in-Training';
            }

        } else if (error) {
            this.error = error;
            console.log(error);
        }
    }

     @wire(getCertifications, {uid: "$uid"})
        certifications({ error, data }) {
        if (data) {
            console.log(data);
            this.certList = data;
            this.isCertListEmpty = this.certList.length > 0;
        } else {
            console.error(error);
        }
    }

    @wire(getTeamInfo) teamInfo;
    @wire(getTechInfo, {uid: "$uid"}) techInfo;

        renderedCallback(){
        if(this.teamInfo.data && this.techInfo){
            this.teamName=this.teamInfo.data[0].Name
            this.teamColor=this.teamInfo.data[0].Primary_Color__c
            this.colorForBack="background-color: "+this.teamColor +";";
        }  
    }
}