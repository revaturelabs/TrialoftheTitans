import { LightningElement, wire, track, api } from 'lwc';
//import getHeroInfo from '@salesforce/apex/EmployerPartnerExperienceSiteHelper.getHeroInfo';
export default class FilterButton extends LightningElement {
    @api unfilteredheroes=[];

    @track filteredHeroes = [];

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

        return returnList;
    }

    // handle change on the picklist value
    handleChange(event) {
        this.filteredHeroes=this.unfilteredheroes.slice();
        let value = event.detail.value;
        let indexes = [];
        let filteringHeroes=[];
        
        this.filteredHeroes.forEach((element, index) => {
            if (value.substring(0, 10) === 'Technology' && element.Technology == value.substring(11)) {
                
                indexes.push(index);
            } else if (value.substring(0, 8) === 'Location' && element.Location == value.substring(9)) {
                indexes.push(index);
            }
        })

        if (indexes != null) {
            for (var i = indexes.length - 1; i >= 0; i--) {
                filteringHeroes.push(this.filteredHeroes[indexes[i]]);
            }
            this.filteredHeroes=filteringHeroes;
            this.dispatchEvent(new CustomEvent('filterevent', {
                detail: this.filteredHeroes
            }));
            
        }
    }

}