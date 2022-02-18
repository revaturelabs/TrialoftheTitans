/////////////////////////////////////////////////////////////////////////////////
//
// Name: Sidebar
// Author(s): Alan Huang, Andrew Emond
// Created: 01/25/2022
// Updated: 01/25/2022
// Description: Sidebar component for Hero Hub
//
/////////////////////////////////////////////////////////////////////////////////

import getAccount from "@salesforce/apex/sidebarController.getAccount";
import getCert from "@salesforce/apex/sidebarController.getCert";
import getPortfolioStatus from "@salesforce/apex/sidebarController.getPortfolioStatus";
import getAvgScorePerTitan from "@salesforce/apex/sidebarController.getAvgScorePerTitan";
import getSquad from "@salesforce/apex/sidebarController.getSquad";
import { LightningElement, wire } from "lwc";

const PROG_CATEGORY = "Programmatic";
const DECL_CATEGORY = "Declarative";
const MISC_CATEGORY = "Miscellaneous";

export default class Sidebar extends LightningElement {
    @wire(getAccount) accInfo;
    @wire(getSquad) squadInfo;
    @wire(getCert) certInfo;
    @wire(getPortfolioStatus) statusInfo;
    @wire(getAvgScorePerTitan)
    fetchAvgScorePerTitan({ error, data }) {
        if (data) {
            this.avgScores = this.formatScores(data);
            this.error = undefined;
        } else if (error) {
            this.avgScores = undefined;
            this.error = error;
            console.error(error);
        }
    }

    error;
    avgScores = [];
    categories = [PROG_CATEGORY, DECL_CATEGORY];
    remainderCategory = MISC_CATEGORY;

    clickedButtonLabel;
    squadName;
    heroName;
    heroTitle;
    heroArete;
    certName;
    certDate;
    certAssessor;
    certVer;
    placeholderChart =
        "https://lh3.googleusercontent.com/g0Jw-I6-gH2DVCpnl3u8QKZVT_meR9lcJlpyeSZ-MyvwLnyEZvgyrY5frldA8HCv55s=w280-rwa";
    portName;
    portStatus;
    renderedCallback() {
        if (this.accInfo.data && this.squadInfo.data && this.statusInfo.data) {
            this.squadName = "Our Hero's Squad: " + this.squadInfo.data.Name;
            this.heroName = "Our Hero's Name: " + this.accInfo.data.Name;
            this.heroArete = "Our Hero's Arete: 53";
            this.heroTitle = "Our Hero's Title: Achilles";

            this.portName = "Portfolio Name : " + this.accInfo.data.Name + "'s Portfolio";
            this.portStatus = "Portfolio Status : " + this.statusInfo.data[0].Portfolio_Status__c;
        }

        console.log("stuff: ", this.certInfo, this.certInfo);
        if (this.certInfo.data && this.certInfo.data.length > 0) {
            this.certName = "Certification Name: " + this.certInfo.data[0].Name;
            this.certDate = "Certification Date: " + this.certInfo.data[0].Date_Issued__c;
            this.certAssessor = "Certification Assessor: " + this.certInfo.data[0].Assessor__c;
            this.certVer = "Certification Verifyer: " + this.certInfo.data[0].Verification_Site__c;
        }
    }

    formatScores(data) {
        const scores = [];

        // create score array with index as keys
        for (let i = 0; i < this.categories.length; i++) {
            scores.push({ key: i, category: this.categories[i], axes: [[]] });
        }
        // if remainder category exists (misc), push to score array
        scores.push({ key: scores.length, category: this.remainderCategory, axes: [[]] });

        // titan filtering loop, categorize titan scores
        for (const titan of data) {
            const axisObj = {};
            axisObj.axis = titan.Name;
            axisObj.value = titan.AvgScore ? titan.AvgScore : 0;
            // boolean to track if titan fits in a category
            let isCategorized = false;

            // loop through categories
            for (let i = 0; i < this.categories.length; i++) {
                // if titan name contains category name push to respective index in scores array
                if (titan.Name.includes(this.categories[i])) {
                    scores[i].axes[0].push(axisObj);
                    isCategorized = true;
                    break;
                }
            }
            // if titan wasn't categorized, push to remainder category
            if (!isCategorized) {
                scores[scores.length - 1].axes[0].push(axisObj);
            }
        }

        return scores;
    }
}
