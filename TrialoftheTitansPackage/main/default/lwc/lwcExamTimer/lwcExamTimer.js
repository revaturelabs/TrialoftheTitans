/**
 * @description       : Countdown timer for the exam
 * @author            : Conner Eilenfeldt, Trevor Kleinstuber
 * @group             :
 * @last modified on  : 02-18-2022
 * @last modified by  : Conner Eilenfeldt
 * Modifications Log
 * Ver   Date         Author                Modification
 * 1.0   02-18-2022   Conner Eilenfeldt     Initial Version
 **/
import { LightningElement, track, api } from 'lwc';

export default class LwcExamTimer extends LightningElement {
    @api examTimeLimit;
    @track timeLeft;
    countDownDate;
    timeIntervalInstance;
    rendered = false;   // guard to stop infinite renderedCallback loop

    renderedCallback() {
        if (!this.rendered) {
            // delay start function so variables have time to load
            setTimeout(() => {  this.start(); }, 1000);
        }
    }

    // start the countdown timer
    start() {
        this.rendered = true;
        let parentThis = this;
        this.countDownDate = new Date().getTime() + this.examTimeLimit * 60000;

        // update the count down every 1 second (1000 milliseconds)
        this.timeIntervalInstance = setInterval(function () {
            // get current date and time
            let now = new Date().getTime();

            // find the distance between now and the countdown date
            let distance = parentThis.countDownDate - now;

            // time calculations for hours, minutes and seconds
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // update time left
            parentThis.timeLeft ="";
            if (hours != 0)
                parentThis.timeLeft += hours + ":"
            parentThis.timeLeft += minutes + ":" + (seconds < 10  ? '0' + seconds : seconds);

            // when the count down is over, submit exam
            if (distance < 0) {
                clearInterval(parentThis.timeIntervalInstance);
                parentThis.timeLeft = "Times Up";
                parentThis.dispatchEvent(new CustomEvent("timesup"));
            }
        }, 1000);
    }
}
