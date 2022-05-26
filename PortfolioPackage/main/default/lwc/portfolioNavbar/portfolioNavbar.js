/****************************************************************************************************
 Author: Mark Snyder
The JavaScript for the navbar below the banner in the portfolio page
 Date Created: 03/10/2022
 Modified Date: 05/23/2022
 Iteration XII
******************************************************************************************************/
import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class PortfolioNavbar extends NavigationMixin(LightningElement) {
    handleClick() {
        console.log("fired");
        this[NavigationMixin.Navigate]({
            type: "comm__namedPage",
            attributes: {
                name: "Home"//API name of the page to navigate to
            }
        });
        console.log("Worked");
    }
}