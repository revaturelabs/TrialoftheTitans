import { LightningElement, track, wire, api } from 'lwc';
import HATICON from '@salesforce/resourceUrl/hat';
import EDITICON from '@salesforce/resourceUrl/editicon';
export default class Portfolioeducation extends LightningElement {

    hatty = HATICON;
    @track modalChecker = false;
    editiconimplementation = EDITICON;
    modalOpener() 
    {
        this.modalChecker = true;
    }
    modalCloser() 
    {
        this.modalChecker = false;
    }
}