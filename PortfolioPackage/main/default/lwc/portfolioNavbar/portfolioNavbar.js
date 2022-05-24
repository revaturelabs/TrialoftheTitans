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