/****************************************************************************************************
 Author: Mark Snyder
The JavaScript for the notifications that go on the navbar
 Date Created: 03/10/2022
 Modified Date: 05/23/2022
 Iteration XII
******************************************************************************************************/
import { LightningElement } from "lwc";
import notificationIcon from "@salesforce/resourceUrl/notificationBell_small";

export default class PortfolioNotifications extends LightningElement {
    notification = notificationIcon;
    showDropdown = false;

    clickHandler(event) {
        event.preventDefault();
        this.showDropdown = !this.showDropdown;
    }
}