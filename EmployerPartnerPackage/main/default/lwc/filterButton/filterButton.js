import { LightningElement, wire, track, api } from 'lwc';
//import getHeroInfo from '@salesforce/apex/EmployerPartnerExperienceSiteHelper.getHeroInfo';
export default class FilterButton extends LightningElement {

    //@track heroes = [];
    @api unfilteredheroes;

    //shallow copy of heroes list
    @track filterHeroes = this.unfilteredheroes;
    // picklist values in a list

    // options to display in the picklist
    get options() {
        let returnList = [{ label: 'Default', value: 'default default' }];
        let Technology = new Set();
        let Location = new Set();

        this.unfilteredheroes.forEach(element => {
            Technology.add(element.Technology);
            Location.add(element.Location);
        });

        Technology.forEach(element => {
            returnList.push({ label: 'Technology: ' + element, value: 'Technology ' + element });
        })

        Location.forEach(element => {
                returnList.push({ label: 'Location: ' + element, value: 'Location ' + element });
            })
            //console.log(returnList);
        return returnList;
    }

    // handle change on the picklist value
    handleChange(event) {
        //console.log(this.unfilteredheroes);
        let value = event.detail.value;
        this.filterHeroes = this.unfilteredheroes;
        let indexes = [];

        this.filterHeroes.forEach((element, index) => {
            if (value.substring(0, 10) === 'Technology' && element.Technology !== value.substring(11)) {
                indexes.push(index);
            } else if (value.substring(0, 8) === 'Location' && element.Location !== value.substring(9)) {
                indexes.push(index);
            }
        })

        if (indexes != null) {
            for (var i = indexes.length - 1; i >= 0; i--) {
                this.filterHeroes.splice(indexes[i], 1);
            }
            this.dispatchEvent(new CustomEvent('filterEvent', {
                detail: this.filterHeroes
            }));
        }

    }

    // @wire (getHeroInfo)     
    // wiredAccount({ error, data }) {
    //     if (data) {
    //         for (let i = 0; i < data.length; i++) {
    //             this.heroes.push(JSON.parse(data[i]));
    //             console.log(JSON.parse(data[i]));
    //         }
    //     }
    // }

}