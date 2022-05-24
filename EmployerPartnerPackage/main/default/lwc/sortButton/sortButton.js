import { LightningElement, wire, track, api } from 'lwc';

export default class SortButton extends LightningElement {
    @api heroes = [];

    // Sets default list of heroes
    sortHeroes = this.heroes;
	
	// Default sorting by relevance
	value = 'relevance';

    get options() {
        return [
            { label: 'Relevancy', value: 'relevance' },
            { label: 'Arete Score', value: 'score' },
            { label: 'Location', value: 'location' },
            { label: 'Alphabetical', value: 'alphabetical' },
        ];
    }

    // Orders heroes by Id, followed by sorting option
	handleChange(event) {
        this.value = event.detail.value;
        this.sortHeroes = this.heroes;

        function SortByID(a, b) {
            return a.Id - b.Id; 
        }
        
        if (this.value == "relevance") {
			// Relevancy determined by profile distance from location plus the Arete score
			// **Default to Arete score while geolocation is being tested
            function SortByArete(a, b) {
                return ((a.Arete == b.Arete) ? 0 : ((a.Arete < b.Arete) ? 1 : -1 ));
            }
            this.heroes.sort(SortByArete);
            this.sortHeroes = [];
            for(var n = 0; n < this.heroes.length; n++){
                this.sortHeroes.push(this.heroes[n]);
            }
        } else if (this.value == "score") {
            function SortByArete(a, b) {
                return ((a.Arete == b.Arete) ? 0 : ((a.Arete < b.Arete) ? 1 : -1 ));
            }
            this.heroes.sort(SortByArete);
            this.sortHeroes = [];
            for(var n = 0; n < this.heroes.length; n++){
                this.sortHeroes.push(this.heroes[n]);
            }
        } else if (this.value == "location") {
            function SortByLocation(a, b) {
                return ((a.Location == b.Location) ? 0 : ((a.Location > b.Location) ? 1 : -1 ));
            }
            this.heroes.sort(SortByLocation);
            this.sortHeroes = [];
            for(var n = 0; n < this.heroes.length; n++){
                this.sortHeroes.push(this.heroes[n]);
            }
        } else if (this.value == "alphabetical") {
            function SortByName(a, b) {
                return ((a.Name == b.Name) ? 0 : ((a.Name > b.Name) ? 1 : -1 ));
            }
            this.heroes.sort(SortByName);
            this.sortHeroes = [];
            for(var n = 0; n < this.heroes.length; n++){
                this.sortHeroes.push(this.heroes[n]);
            }
        }
        this.dispatchEvent(new CustomEvent('sortevent', {
            detail : this.sortHeroes
        }));
    }
}