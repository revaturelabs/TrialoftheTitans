import { LightningElement, wire, track, api } from 'lwc';

export default class SortButton extends LightningElement {
    @api heroes = [];
    
    // Togglable Buttons, Untogglable Sorting
    // Sorts 1 state at a time
    @track sortNameState = false;
    @track sortAreteState = false;
    @track sortLocationState = false;

    // Sets default list of heroes
    sortHeroes = this.heroes;

    // Orders heroes by Id, followed by Alphabetical names
    handleNameClick(){
        this.sortNameState = !this.sortNameState;
        this.sortHeroes = this.heroes;

        function SortByID(a, b) {
            return a.Id - b.Id; 
        }
        function SortByName(a, b) {
            return ((a.Name == b.Name) ? 0 : ((a.Name > b.Name) ? 1 : -1 ));
        }
        this.heroes.sort(SortByName);
        this.sortHeroes = [];
        for(var n = 0; n < this.heroes.length; n++){
            this.sortHeroes.push(this.heroes[n]);
        }
        this.dispatchEvent(new CustomEvent('sortevent', {
            detail : this.sortHeroes
        }));
    }

    // Orders heroes by Id, followed by Top-most Arete scores
    handleAreteClick(){
        this.sortAreteState = !this.sortAreteState;
        this.sortHeroes = this.heroes;

        function SortByID(a, b) {
            return a.Id - b.Id; 
        }
        function SortByArete(a, b) {
            return ((a.Arete == b.Arete) ? 0 : ((a.Arete < b.Arete) ? 1 : -1 ));
        }
        this.heroes.sort(SortByArete);
        this.sortHeroes = [];
        for(var n = 0; n < this.heroes.length; n++){
            this.sortHeroes.push(this.heroes[n]);
        }
        this.dispatchEvent(new CustomEvent('sortevent', {
            detail : this.sortHeroes
        }));
    }

    // Orders heroes by Id, followed by Alphabetical locations
    handleLocationClick(){
        this.sortLocationState = !this.sortLocationState;
        this.sortHeroes = this.heroes;

        function SortByID(a, b) {
            return a.Id - b.Id; 
        }
        function SortByLocation(a, b) {
            return ((a.Location == b.Location) ? 0 : ((a.Location > b.Location) ? 1 : -1 ));
        }
        this.heroes.sort(SortByLocation);
        this.sortHeroes = [];
        for(var n = 0; n < this.heroes.length; n++){
            this.sortHeroes.push(this.heroes[n]);
        }
        this.dispatchEvent(new CustomEvent('sortevent', {
            detail : this.sortHeroes
        }));
    }
}