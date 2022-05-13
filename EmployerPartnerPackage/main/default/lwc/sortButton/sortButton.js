import { LightningElement, wire, track } from 'lwc';

export default class SortButton extends LightningElement {
    @track heroes = [{
            "Id": 1,
            "Link": "Dummy Link",
            "Name": "Anderson White",
            "Title": "CEO",
            "Location": "New York",
            "Technology": "Salesforce",
            "Favorite": false,
            "Arete": "60"
        },
        {
            "Id": 2,
            "Link": "Dummy Link",
            "Name": "John Smith",
            "Title": "VP",
            "Location": "Miami",
            "Technology": "Salesforce",
            "Favorite": false,
            "Arete": "65"
        },
        {
            "Id": 3,
            "Link": "Dummy Link",
            "Name": "Joe Burrow",
            "Title": "COO",
            "Location": "Cincinnati",
            "Technology": "Java",
            "Favorite": false,
            "Arete": "70"
        },
        {
            "Id": 4,
            "Link": "Dummy Link",
            "Name": "Burton Guster",
            "Title": "CSR",
            "Location": "Los Angeles",
            "Technology": "C++",
            "Favorite": false,
            "Arete": "80"
        }
    ];

    // Togglable Buttons, Untogglable Sorting
    // Sorts 1 state at a time
    @track sortNameState = false;
    @track sortAreteState = false;

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
    }
}