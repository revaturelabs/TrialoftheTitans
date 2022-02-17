import { LightningElement } from 'lwc';

export default class LwcFlagForReview extends LightningElement {
   
    handleClick(event) {
        this.dispatchEvent(new CustomEvent('markreview'));
        console.log(event.target.label);
    }
}