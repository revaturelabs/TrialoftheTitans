import { LightningElement } from 'lwc';
  
    export default class masteriesAndFeats extends LightningElement {
        //create the tabs and the info inside of them   
        tabs = [{
            title: "Masteries",
            Content: true,
            Id: "tab-scoped-1__item",
            cssTab:"slds-tabs_scoped__item slds-is-active slds-size_1-of-2 tabStyle",
            cssClass: "slds-tabs_scoped__content slds-show",
            index: "0",
            ariaControls:"tab-scoped-1",
            selected: "true",
            
        }, {
            title: "Feats",
            Content: false,
            Id: "tab-scoped-2__item",
            cssTab:"slds-tabs_scoped__item slds-size_1-of-2 tabStyle",
            cssClass: "slds-tabs_scoped__content slds-hide",
            index: "-1",
            ariaControls:"tab-scoped-2",
            selected: "false",
            
        }];

        handleChange(event) {
            content1 = tab.Content;
            this.content1 = event.target.checked;
        }
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