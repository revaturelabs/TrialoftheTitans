import getAccount from '@salesforce/apex/sideBarHelper.getAccount';
import getCert from '@salesforce/apex/sideBarHelper.getCert';
import getPortfolioStatus from '@salesforce/apex/sideBarHelper.getPortfolioStatus';
import getSquad from '@salesforce/apex/sideBarHelper.getSquad';
import { LightningElement,wire } from 'lwc';

export default class SideBar extends LightningElement {
    @wire(getAccount) accInfo;
    @wire(getSquad) squadInfo;
    @wire(getCert) certInfo;
    @wire(getPortfolioStatus) statusInfo;
    clickedButtonLabel;
    squadName;
    heroName;
    heroTitle;
    heroArete;
    certName;
    certDate;
    certAssessor;
    certVer;
    placeholderChart = "https://lh3.googleusercontent.com/g0Jw-I6-gH2DVCpnl3u8QKZVT_meR9lcJlpyeSZ-MyvwLnyEZvgyrY5frldA8HCv55s=w280-rwa"
    portName;
    portStatus;
    renderedCallback(){
        if(this.accInfo.data && this.squadInfo.data && this.certInfo.data){
            console.log(this.statusInfo)
            this.squadName = "Our Hero's Squad: " +this.squadInfo.data[0].Name
            this.heroName = "Our Hero's Name: " + this.accInfo.data[0].Name
            this.heroArete = "Our Hero's Arete: "
            this.heroTitle = "Our Hero's Title: "
            this.certName = "Certification Name: "+this.certInfo.data[0].Name
            this.certDate = "Certification Date: " +this.certInfo.data[0].Date_Issued__c
            this.certAssessor = "Certification Assessor: "+this.certInfo.data[0].Assessor__c
            this.certVer = "Certification Verifyer: " +this.certInfo.data[0].Verification_Site__c
            this.portName = "Portfolio Name : " + this.accInfo.data[0].Name + "'s Portfolio"
            this.portStatus = "Portfolio Status : " + this.statusInfo.data[0].Portfolio_Status__c
        }
    }
}