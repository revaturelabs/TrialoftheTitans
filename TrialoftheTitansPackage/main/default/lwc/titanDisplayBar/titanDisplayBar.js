import { LightningElement, track, api } from "lwc";
import getTitanById from "@salesforce/apex/titanDisplayController.getTitanById";
import getCurrentUser from "@salesforce/apex/titanDisplayController.getCurrentUser";
import getNumberOfTitanExams from "@salesforce/apex/titanDisplayController.getNumberOfTitanExams";
import getUserExams from "@salesforce/apex/titanDisplayController.getUserExams";
import { NavigationMixin } from 'lightning/navigation';

//d3 imports
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { loadScript } from "lightning/platformResourceLoader";
import D3 from "@salesforce/resourceUrl/DJS3";
export default class TitanDisplayBar extends NavigationMixin(LightningElement) {
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
                    if (Object.keys(res).length != null) {
                        this.passedExams = Object.keys(res).length;
                    } else {
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
        // Store the PageReference to Titan Hub page in a variable
        this.titanHubPage = ({
            type: 'standard__webPage',
            attributes: {
                url: 'https://trialofthetitans11-developer-edition.na213.force.com/s/titan-hub'
            }
        });
        this[NavigationMixin.GenerateUrl](this.titanHubPage)
            .then(url => this.url = url);
    }

    handleOverview(evt) {

        this.disableOverview = true;
        evt.preventDefault();
        evt.stopPropagation();
        this[NavigationMixin.Navigate](this.titanHubPage);
    }

    handleAdvance() {

    }
}