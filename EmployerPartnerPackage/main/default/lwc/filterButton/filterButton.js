import { LightningElement, wire, track, api} from 'lwc';
//import getHeroInfo from '@salesforce/apex/EmployerPartnerExperienceSiteHelper.getHeroInfo';
export default class FilterButton extends LightningElement {

    @track heroes=[];
    
    @api set unfilteredheroes (value){
    console.log(this.value);
    this.heroes=this.value;
    let Technology = new Set();
    let Location = new Set();

    this.heroes.forEach(element => {
        Technology.add(element.Technology);
        Location.add(element.Location);

    });

    Technology.forEach(element => {
        this.returnList.push({ label: 'Technology: ' + element, value: 'Technology ' + element });
    })

    Location.forEach(element => {
        this.returnList.push({ label: 'Location: ' + element, value: 'Location ' + element });
    })
    }
    //shallow copy of heroes list
    @track filterHeroes = this.heroes.slice();
    // picklist values in a list
     returnList = [{ label: 'Default', value: 'default default' }];



    // options to display in the picklist
    get options() {
        return this.returnList;
    }

    // handle change on the picklist value
    handleChange(event) {
        let value = event.detail.value;
        this.filterHeroes = this.heroes.slice();
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