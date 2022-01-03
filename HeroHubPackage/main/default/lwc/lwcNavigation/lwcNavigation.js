/*
    Name: lwcNavigation
    Author: Austin Ward
    Description: header and navigation
    Last updated: 1/3/2022
*/
import { LightningElement, wire, track, api } from 'lwc';
import Id from '@salesforce/user/Id';
import NAME from '@salesforce/schema/User.Name';


export default class LwcNavigation extends LightningElement {
    @api username;
    
    fireNav(){
        this.dispatchEvent(this.MainPageNavigation);
    }
    MainPageNavigation = (event) => {
        //this is where the event code for MainPageNavigation (aura) would be implemented
    }
}