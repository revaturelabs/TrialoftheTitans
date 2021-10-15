/**
 * @description       :
 * @author            : Daniel Boice
 * @group             :
 * @last modified on  : 10-02-2021
 * @last modified by  : Daniel Boice
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   10-02-2021   Daniel Boice   Initial Version
 **/
import { LightningElement, track, api } from "lwc";

export default class LwcSldsModal extends LightningElement {
  //track whether the modal is open(true) or closed(false), closed by default
  @track isModalOpen = false;

  @api
  showButtonText;
  @api
  closeButtonText;
  @api
  modalHeader;
  @api
  modalContent;
  @api
  confirmButtonLabel;
  @api
  closeButtonLabel;
  @api
  showButtonDisabled;
  //sets the isModalOpen property to true, indicating that the Modal is Open
  @api
  showModal() {
    this.isModalOpen = true;
  }

  //sets the isModalOpen property to false, indicating that the Modal is Closed
  @api
  closeModal() {
    this.isModalOpen = false;
  }

  /* 
  can be used instead of the above two methods - showModal() & closeModal()
  just toggles the isModalOpen property - true if false, false if true 
  */

  // Veselin Georgiev - 10/15/21 -- this function is not used at all
  /*
 @api
  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }
*/
  handleConfirmClick(event) {
    const confirmEvent = new CustomEvent("confirmationclick", {
      detail: event.target.value
    });

    // Dispatches the event.
    this.dispatchEvent(confirmEvent);
    this.isModalOpen = false;
  }
  //compute the CSS classes of the Modal(popup) based on the value of isModalOpen property
  get modalClass() {
    return `slds-modal ${this.isModalOpen ? "slds-fade-in-open" : ""}`;
  }

  //compute the CSS classes of the Modal Backdrop(grey overlay) based on the value of isModalOpen property
  get modalBackdropClass() {
    return `slds-backdrop ${this.isModalOpen ? "slds-backdrop_open" : ""}`;
  }
}
