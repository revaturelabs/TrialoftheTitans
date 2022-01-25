import { LightningElement } from "lwc";
import notificationIcon from "@salesforce/resourceUrl/notificationBell_small";
export default class Notifications extends LightningElement {
    notification = notificationIcon;
    showDropdown = false;

    clickHandler(event) {
        event.preventDefault();
        this.showDropdown = !this.showDropdown;
    }
}
