import { LightningElement, track, api } from 'lwc';

export default class FilterButton extends LightningElement {
    // the list of unfiltered heroes used from employerPartnerExperience (main) component
    @api unfilteredheroes;

    //hard copy of unfilteredheroes list. It's used to remove all irrelevant heroes but not tampering the orignal.
    @track filteredHeroes = Object.assign([], this.unfilteredheroes);

    // options to display in the picklist
    get options() {
        //having initial label default to display all. 
        let returnList = [{ label: 'Default', value: 'default default' }];

        //2 sets of Technology and Location used to add to picklist.
        let Technology = new Set();
        let Location = new Set();

        this.unfilteredheroes.forEach(element => {
            Technology.add(element.Technology);
            Location.add(element.Location);
        });

        Technology.forEach(element => {
            //console.log(element);
            if (element !== null) {
                returnList.push({ label: 'Technology: ' + element, value: 'Technology ' + element });
            }
        })

        Location.forEach(element => {
            if (element !== null) {
                returnList.push({ label: 'Location: ' + element, value: 'Location ' + element });
            }
        })

        return returnList;
    }

    // handle change on the picklist values
    handleChange(event) {
        let value = event.detail.value;
        //reassigning the filterHeroes list in case it got modified from the previous selection.
        this.filteredHeroes = Object.assign([], this.unfilteredheroes);

        //list of indexes to remove
        //The reason to do this is because the list need to be remove backward so that it won't accidentally
        //skip an element.
        let indexes = [];

        //console.log(this.filteredHeroes);
        //console.log(this.unfilteredHeroes);

        this.filteredHeroes.forEach((element, index) => {
            if (value.substring(0, 10) === 'Technology' && element.Technology !== value.substring(11)) {
                indexes.push(index);
            } else if (value.substring(0, 8) === 'Location' && element.Location !== value.substring(9)) {
                indexes.push(index);
            }
        })

        //console.log(indexes);
        if (indexes != null) {
            //loop to remove all unwanted heroes
            for (var i = indexes.length - 1; i >= 0; i--) {
                this.filteredHeroes.splice(indexes[i], 1);
            }
            // event up filteredHeroes list to employerPartnerExperience
            this.dispatchEvent(new CustomEvent('filterevent', {
                detail: this.filteredHeroes
            }));
        }
    }

}