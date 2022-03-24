import { LightningElement, track, wire, api } from 'lwc';
//import HATICON from '@salesforce/resourceUrl/hat';
//import EDITICON from '@salesforce/resourceUrl/editicon';
export default class Portfolioeducation extends LightningElement {
/*
    hatty = HATICON;
    editiconimplementation = EDITICON;
*/    
    @track modalChecker = false;
    
    modalOpener() 
    {
        this.modalChecker = true;
    }
    modalCloser() 
    {
        this.modalChecker = false;
    }
}