import { LightningElement, track, wire } from "lwc";
import getTitanDependencies from "@salesforce/apex/titanDisplayController.getTitanDependencies";

export default class TitanViewContainer extends LightningElement {
    @track titanList = [];
    @track peopleList = [];
    @track shown = [];

    connectedCallback() {
        let titans = getTitanDependencies();
        titans.then((res) => {
            this.checkTitan(res, 0, 0);
        });
    }

    checkTitan(titans, tabs) {
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
            console.log({ name: keys[index], tabs: tabTotal });
            this.shown.push(keys[index]);

            for (let child of titans[keys[index]]) {
                if (this.titanList.indexOf(child.Name) == -1) {
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
