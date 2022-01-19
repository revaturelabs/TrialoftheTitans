import { LightningElement, track, wire } from "lwc";
import getTitanDependencies from "@salesforce/apex/titanDisplayController.getTitanDependencies";
import getTitanById from "@salesforce/apex/titanDisplayController.getTitanById";

export default class TitanViewContainer extends LightningElement {
    @track titanList = [];
    @track titanListHolder = [];
    @track peopleList = [];
    @track shown = [];

    connectedCallback() {
        let titans = getTitanDependencies();
        titans.then((res) => {
            this.checkTitan(res);
            for (let titan of this.titanList) {
                console.log(titan.name);
                let newTitan = getTitanById({ identifier: titan.name });
                newTitan.then((res) => {
                    console.log(res);
                    this.titanListHolder.push({ Id: res[0].Id, tech: res[0].Technology__c, tabs: titan.tabs });
                });
            }
        });
    }

    checkTitan(titans) {
        let keys = Object.keys(titans);

        for (let key of keys) {
            if (this.shown.indexOf(key) == -1) {
                this.evaluateChildren(titans, keys.indexOf(key), 0);
            }
        }
    }

    evaluateChildren(titans, index, tabs) {
        let keys = Object.keys(titans);

        if (titans[keys[index]] != null) {
            let tabTotal = [];
            for (let i = 0; i < tabs; i++) {
                tabTotal.push({ id: i });
            }
            this.titanList.push({ name: keys[index], tabs: tabTotal });
            this.shown.push(keys[index]);

            for (let child of titans[keys[index]]) {
                if (this.titanList.indexOf(child.Id) == -1) {
                    this.evaluateChildren(titans, keys.indexOf(child.Id), tabs + 1);
                }
            }
        } else if (titans[keys[index]] == null) {
            this.titanList.push(keys[index]);
            this.shown.push(keys[index]);
            return;
        }
    }
}

// if (titans[keys[index]] != null) {
//     let tabTotal = [];
//     for (let i = 0; i < tabs; i++) {
//         tabTotal.push({ id: i });
//     }
//     this.titanList.push({ name: keys[index], tabs: tabTotal });
//     console.log({ name: keys[index], tabs: tabTotal });
//     this.shown.push(keys[index]);

//     for (let child of titans[keys[index]]) {
//         if (this.titanList.indexOf(child.Name) == -1) {
//             this.evaluateChildren(titans, keys.indexOf(child.Name), tabs + 1);
//         }
//     }
// } else if (titans[keys[index]] == null) {
//     this.titanList.push(keys[index]);
//     this.shown.push(keys[index]);
//     return;
// }
