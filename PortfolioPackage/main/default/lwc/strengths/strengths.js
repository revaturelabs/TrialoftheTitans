import { LightningElement } from 'lwc';

export default class Strengths extends LightningElement {
        //create a property
    // @track strengths;
    // //create a method
    // @wire(getStrengths)
    // wiredStrengths({ error, data }) {
    //     if (data) {
    //         this.strengths = data;
    //     } else if (error) {
    //         console.log(error);
    //     }
    // }
    
    showEditStrengthsBoolean = false;

    //create a method
    showEditStrengthsForm() {
        console.log('showEditStrengthsForm');
        this.showEditStrengthsBoolean = true;
        //create an event
        const showEditStrengthsEvent = new CustomEvent('showeditstrengthsform');
        //dispatch the event
        this.dispatchEvent(showEditStrengthsEvent);
    }
}