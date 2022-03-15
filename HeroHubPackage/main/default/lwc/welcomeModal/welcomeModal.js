//Name: Welcome Modal
//Purpose: Displays modals to welcome a new user on their very first login, and to display weekly news to a user on their first login of each week (Weekly Reset Handled by Flow)
//Created By: Chris Eng, Nick de Sousa, Matt Lewandowski
//Date: January 25th, 2022
import { LightningElement, track, api, wire } from "lwc";
import getViewedWeekly from "@salesforce/apex/modalHelper.getViewedWeekly";
import getViewedWelcome from "@salesforce/apex/modalHelper.getViewedWelcome";
import closeNewsModal from "@salesforce/apex/modalHelper.closeNewsModal";
import closeWelcomeModal from "@salesforce/apex/modalHelper.closeWelcomeModal";
import Id from "@salesforce/user/Id";
//Uses LMS to subscribe to messages published for the Leaderboard Info
import {
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    createMessageContext,
    MessageContext
} from "lightning/messageService";

import NOTIFICATION from "@salesforce/messageChannel/Notification__c";

export default class WelcomeModal extends LightningElement {
    // Variables needed to make the Modals display correctly with conditional logic
    @track hasViewedNews = true;
    @track hasViewedWelcome = true;
    @track error;

    // Variables for displaying dynamic messages for each user. Should pull value from LMS when complete.
    @wire(MessageContext) messageContext;
    subscription = null;
    
    //Modal Message Holders
    @track squadNews;
    @track cohortNews;
    @track leagueNews;
    @track questNews;

    // Squad News
    @api squadBest;
    @api squadBestScore;
    @api userSquad;

    // Cohort News
    @api bestSquad;
    @api bestSquadTeam;
    @api bestSquadScore;
    @api scoreDifference;
    @api userSquadScore; // Potentially unneeded if LMS passes the already calculated difference.

    // League News
    @api bestTeam;
    @api bestTeamWins;
    @api userTeam;
    @api userTeamWins;
    @api weeksRemaining;
    @api activeCohorts;

    // Quests
    @api bonusQuest;
    @api bonusMulitplier;

    // connectedCallback calls when the LWC is connected to the experience site and runs our getters for hasViewedNews and hasViewedWelcome
    connectedCallback() {
        // Calls SubscribeMC function.
        this.subscribeMC();

        /* Arrow functions to call getViewedWeekly and getViewedWelcome, passing in the current user's ID. 
       These can not be called in the builder, and can only be tested by a proper user account.
       If they run, it sets the results. If it fails, it sets the error and logs it to console.
    */
        getViewedWeekly({ userID: Id })
            .then((result) => {
                this.hasViewedNews = result;
                this.error = undefined;
            })
            .catch((error) => {
                this.error = error;
            });

        getViewedWelcome({ userID: Id })
            .then((result) => {
                this.hasViewedWelcome = result;
            })
            .catch((error) => console.log(result));
    }

    // closeWelcome is called when the welcome Modal is closed, and calls the Apex Method to set the checkbox.
    closeWelcome() {
        this.hasViewedWelcome = true;
        closeWelcomeModal({ userID: Id })
            .then((result) => console.log(result))
            .catch((error) => console.log(error));
    }

    // closeNews is called when the news Modal is closed, and calls the Apex Method to set the checkbox.
    closeNews() {
        this.hasViewedNews = true;
        closeNewsModal({ userID: Id })
            .then((result) => console.log(result))
            .catch((error) => console.log(error));
    }

    // Unsubscribes from the message channel when the LWC is closed or disconnected.
    disconnectedCallback() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    // Called from connected call back, subscribes the LWC to the message channel for the leaderboards.
    // If subscription is already set, this does nothing. If it is undefined, subscribe and catch messages via handleMessage function.
    subscribeMC() {
        if (this.subscription) {
            return;
        } else {
            this.subscription = subscribe(
                this.messageContext,
                NOTIFICATION,
                (message) => {
                    console.log("message: ", message);
                    this.handleMessage(message);
                },
                { scope: APPLICATION_SCOPE }
            );
        }
    }

    // Takes the message from the message channel as a parameter and compares the message against conditionals to determine which data it contains.
    // It sorts the data based on which data is contained determined by the conditionals, and once all 3 messages have been received it concatenates the final news.
    handleMessage(message) {
        console.log(message);
        if (message.teamData) {
            this.bestTeam = message.teamData[0].Team;
            this.bestTeamWins = message.teamData[0].Weeks_Won;
        } else if (message.cohortData) {
            this.bestSquad = message.cohortData[0].squad_name;
            this.bestSquadTeam = message.cohortData[0].Name;
            this.bestSquadScore = message.cohortData[0].Average_Score;
        } else if (message.squadData) {
            this.userTeam = message.squadData[0].Team__r.Name;
            this.userSquad = message.squadData[0].Squad__r.Name;
            this.squadBestScore = message.squadData[0].Weekly_Arete_Number__c;
            this.squadBest = message.squadData[0].Name;
        }

        if (this.userTeam && this.bestTeamWins && this.bestSquad) {
            console.log("hello im in if");
            // These quest variables will need an LMS when quest is implemented. These are just static test values.
            this.bonusQuest = "Proskero (Process Automation)";
            this.bonusMulitplier = "doubled";

            /* Commented out sections can not be determined using current LMS data and the LMS on the leaderboards needs to be changed. 
        The LMS sends a limit of 3 values per message, meaning at least 1 team, squad, or potential user's data is not sent making 
        accurately calculating 'total squad score' or similar values impossible. This can be solved by tweaking the LMS and adding
        the necessary logic here.
      */
            this.squadNews =
                this.squadBest +
                " is leading the squad, " +
                this.userSquad +
                ", for this week with a total score of " +
                this.squadBestScore +
                "ar!";
            this.cohortNews =
                this.bestSquad +
                " squad of Team " +
                this.bestSquadTeam +
                " is leading the cohort with a combined score of " +
                this.bestSquadScore +
                "ar!" /*+ "\n \n Your Squad, " + this.userSquad + ", is " + this.scoreDifference + "ar behind!"*/;
            this.leagueNews =
                "Team " +
                this.bestTeam +
                " leads the league with " +
                this.bestTeamWins +
                " cohort victories. " /*+ "\n \nYour team, " + this.userTeam + ", is " + (this.bestTeamWins-this.userTeamWins) + " behind! There are " + this.weeksRemaining + " more weeks in this league, with " + this.activeCohorts + " ongoing cohorts."*/;
            this.questNews = "This week Arete gain from " + this.bonusQuest + " is " + this.bonusMulitplier;
            console.log("news: ", this.leagueNews, this.squadNews, this.cohortNews);
        }
    }
}
