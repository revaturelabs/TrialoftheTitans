import { LightningElement, track, api } from "lwc";
import getTitanById from "@salesforce/apex/titanDisplayController.getTitanById";
import getCurrentUser from "@salesforce/apex/titanDisplayController.getCurrentUser";
import getNumberOfTitanExams from "@salesforce/apex/titanDisplayController.getNumberOfTitanExams";
import getUserExams from "@salesforce/apex/titanDisplayController.getUserExams";

import getUserNextExam from "@salesforce/apex/titanDisplayController.getUserNextExam";
import { NavigationMixin } from 'lightning/navigation';

//d3 imports
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { loadScript } from "lightning/platformResourceLoader";
import D3 from "@salesforce/resourceUrl/DJS3";
import SystemModstamp from "@salesforce/schema/Account.SystemModstamp";
export default class TitanDisplayBar extends NavigationMixin(LightningElement)  {
    @track disableOverview = false;
    @track disableAdvance = false;
    @api titanId;
    @track currentUser;
    @track passedExams;
    @track totalExams;
    userExamsLoaded = false;

    @api id;
    @track titanName;

    renderedCallback() {
        let slicedId = this.id.slice(0, 18);
        let titan = getTitanById({ identifier: slicedId });
        titan.then((res) => {
            this.titanName = res[0].Name;
        });

        let user = getCurrentUser();
        user.then((res) => {
            this.currentUser = res;

            let userExams = getUserExams({ titanId: slicedId, userId: this.currentUser.Id });
            userExams.then((res) => {
                if (Object.keys(res).length != null){
                    this.passedExams = Object.keys(res).length;
                }
                else{
                    this.passedExams = 0;
                }
                this.userExamsLoaded = true;
            })
            .catch((error) => {
                console.log('error:', error);
                this.passedExams = 0;
                this.userExamsLoaded = true;
            });
        });

        let numExams = getNumberOfTitanExams({ titanId: slicedId });
        numExams.then((res) => {
            this.totalExams = res;
        });
    }

    connectedCallback() {
        
    }

    //Navigate to the Titan Hub Page
    //Recieve Titan ID
    handleOverview() {
        let slicedId = this.id.slice(0, 18);
        this[NavigationMixin.Navigate]({
            type: "comm__namedPage",
            attributes: {
                name: "Titan_Hub__c"//API name of the page to navigate to
            },
             state: {
                c__titanId: slicedId
             }
        });
    }

    //Navigate to the Exam Interview Page
    //Recieve ExamId and AccountId
    handleAdvance() {

        let slicedId = this.id.slice(0, 18);
        
        getUserNextExam({titanId : slicedId, userId : this.currentUser.Id})
            .then((result) => {

                this[NavigationMixin.Navigate]({
                    type: "comm__namedPage",
                    attributes: {
                        name: "Hero_Results__c"//API name of the page to navigate to
                    },
                     state: {
                         c__examId: result,
                         c__accountId: this.currentUser.Id
                     },
                });
                

            })
            .catch((error) => {
                this.error = error;
                console.log(error);
            });

        
    }
}
