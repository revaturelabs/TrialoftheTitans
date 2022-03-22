import { LightningElement } from 'lwc';
import HATICON from '@salesforce/resourceUrl/hat';
import EDITICON from '@salesforce/resourceUrl/editicon';
export default class Portfolioeducation extends LightningElement {
   hatty = HATICON;
   editiconimplementation = EDITICON;
   handleEvent(){ 
       alert("Something");
   }
}