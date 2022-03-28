/*
 * @description       : Mark question for review button
 * @author            : Andrew Tran
 * @group             :
 * @last modified on  : 02-15-2022
 * @last modified by  : Andrew Tran
 * Modifications Log
 * Ver   Date         Author               Modification
 * 1.0   02-15-2022   Andrew Tran          Initial Version
 **/
import { LightningElement } from 'lwc';

export default class LwcMarkForReview extends LightningElement {
   
    handleClick(event) {
        this.dispatchEvent(new CustomEvent('markreview'));
        console.log(event.target.label);
    }
}