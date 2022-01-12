/////////////////////////////////////////////////////
//
//  Name: PortfolioHeader lwc
//  Author: Ethan Wilson
//  Description: Component for the header section of the Hero portfolio. 
//                It gets the user name and allows the user to prefix a title
//  Last Updated: 10/20/21
//
///////////////////////////////////////////////////


import { LightningElement, wire, api } from 'lwc';
import getUserName from '@salesforce/apex/PortfolioHeaderController.getUserName';

export default class LwcPortfolioHeader extends LightningElement {

    @wire(getUserName)
    userName;

    titleList = [
        {   value: 'Knight', 
            label: 'Knight', 
        },
        {
            value: 'Warrior',
            label: 'Warrior',
        },
        {
            value: 'Gladiator',
            label: 'Gladiator',
        },
    ];

    selectedTitle;
    editMode = false;

    setEdit() {
        if(this.editMode == false) {
            this.editMode = true;
        } else {
            this.editMode = false;
        }
    }

    setTitle(event) {
        this.selectedTitle = event.detail.value;
    }
}