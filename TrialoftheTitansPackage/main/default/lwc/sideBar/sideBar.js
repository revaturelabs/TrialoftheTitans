import getAccount from '@salesforce/apex/sideBarHelper.getAccount';
import getCert from '@salesforce/apex/sideBarHelper.getCert';
import getPortfolioStatus from '@salesforce/apex/sideBarHelper.getPortfolioStatus';
import getAvgScorePerTitan from '@salesforce/apex/sideBarHelper.getAvgScorePerTitan'
import getSquad from '@salesforce/apex/sideBarHelper.getSquad';
import { LightningElement,wire } from 'lwc';

export default class SideBar extends LightningElement {
    @wire(getAccount) accInfo;
    @wire(getSquad) squadInfo;
    @wire(getCert) certInfo;
    @wire(getPortfolioStatus) statusInfo;
    @wire(getAvgScorePerTitan)
    fetchAvgScorePerTitan({ error, data }) {
        if (data) {
            console.log(data)
            this.avgScores = data
            this.error = undefined
        } else if (error) {
            this.avgScores = undefined
            this.error = error
            console.error(error)
        }
    }

    error
    avgScores

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

    get radarData() {
        if (this.avgScores) {
            console.log(this.avgScores)
            // Create an array of unique Titan categories

            // Create a radar chart array with titan and exam data
            const data = []
            for (const titan of this.avgScores) {
                const axisObj = {}
                axisObj.axis = titan.Name
                axisObj.value = (titan.AvgScore ? titan.AvgScore : 0)
                data.push(axisObj)
            }
            return [data]
        } else {
            return undefined
        }
    }
}
