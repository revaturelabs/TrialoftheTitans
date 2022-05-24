/* Author: Jacob Blockey
    Description: LWC component that displays the Masteries/feats tabs and their respective components . 
    Date Created: 05/10/22
    Modified Date: 05/10/2022
    Iteration XII */
    import { LightningElement } from 'lwc';

    export default class masteriesandFeats extends LightningElement {
        //create the tabs and the info inside of them
        tabs = [{
            title: "Masteries",
            Content: "Content1",
            Id: "tab-scoped-1__item",
            cssTab:"slds-tabs_scoped__item slds-is-active slds-size_1-of-2 tabStyle",
            cssClass: "slds-tabs_scoped__content slds-show",
            index: "0",
            ariaControls:"tab-scoped-1",
            selected: "true",
            
        }, {
            title: "Feats",
            Content: "Content2",
            Id: "tab-scoped-2__item",
            cssTab:"slds-tabs_scoped__item slds-size_1-of-2 tabStyle",
            cssClass: "slds-tabs_scoped__content slds-hide",
            index: "-1",
            ariaControls:"tab-scoped-2",
            selected: "false",
            
        }];
        
        //handles clicking to the other tabs and changing the \
        //required fields to change the content to the othe tabs
        handleClick(event) {
            this.tabs = this.tabs.map(tab => {
                if(tab.Id === event.target.dataset.link) {
                    tab.cssClass = "slds-tabs_scoped__content slds-show";
                    tab.index = "0";
                    tab.selected = "true";
                    tab.cssTab = "slds-tabs_scoped__item slds-size_1-of-2 slds-is-active tabStyle";
                } else {
                    tab.cssClass = "slds-tabs_scoped__content slds-hide";
                    tab.index = "-1";
                    tab.selected = "false";
                    tab.cssTab = "slds-tabs_scoped__item slds-size_1-of-2 tabStyle";
                }
                return tab;
              });
            }
    }
    