/**
Created By Theodore Moore @Theodore#1829 on Discord
Updated by: Theodore Moore, Quan Nguyen, Carlos Concepcion
Last Edited: 5/23/2022 for Documentation

This component is meant to take the results and show them using an API of heroes
It also inputs the search result and process any searched 
    
To do:    
    -Needs to be fixed so that a new search resets our page to 1 (Filter too maybe)
        


**/
import hero from '@salesforce/resourceUrl/hero';
import { LightningElement, track, api } from 'lwc';
import IMG from '@salesforce/resourceUrl/NoAltImages';

export default class HeroResultsComponent extends LightningElement {
    //This is being grabbed from employerPartnerExperience

    noImageAltURL = IMG;
    specialChar = '<';
    /*
        msg is our search input
        heroes is our list input
    */
    @api msg = '';
    @api heroes = [];
    /*
        Searched Heroes is the list of heroes searched for
    */
    @track searchedHeroes = [];
    //this checks if the modal should be viewable
    @track viewableModal = false;
    /*
        currentPage keeps track of what page of our results we are on 
            -Needs to be fixed so that a new search resets our page to 1
            remote 
    */
    @track currentPage = 1;
    //This Allows us to show what the current hero wwe are looking at is
    @track currentHero;

    /**
        This gets the current heroes for the page, currently puts us in pages of 9
        This can be changed but you'd have to change the get pages() method


    */
    get currentHeroes() {
        //Try catch since heroes comes in asyncronously from apex
        try {
            /**
                If there is a search we only want to display the heroes w'ev searched for
            */
            if (this.msg) {
                //empty the lis of heroes weve searched for
                this.searchedHeroes = [];
                /**
                    For every hero we want to check if name location or technology matches 
                    and only display 1 if any of them match, also while checking if they are null
                    in case of a lack of 1 of the 3
                */
                this.heroes.forEach(hero => {
                    let hasName = false;
                    let hasLocation = false;
                    if (hero.Name.toLowerCase().includes(this.msg.toLowerCase())) {
                        this.searchedHeroes.push(hero);
                        hasName = true;
                    }
                    if (hero.Location != null && !hasName) {
                        if (hero.Location.toLowerCase().includes(this.msg.toLowerCase())) {
                            this.searchedHeroes.push(hero);
                            hasLocation = true;
                        }
                    }
                    if (hero.Technology != null && !hasName && !hasLocation) {
                        if (hero.Technology.toLowerCase().includes(this.msg.toLowerCase())) {
                            this.searchedHeroes.push(hero);
                        }
                    }
                });

            } 
            //if their is no search display them all
            else {
                this.searchedHeroes = this.heroes;
            }
            //logic to set the page of heroes to a group of 9 depending on page number
            let theseHeroes = [];
            let start = 9 * (this.currentPage - 1);
            let end = (9 * this.currentPage);
            for (let i = start; i < this.searchedHeroes.length && i < end; i++) {
                theseHeroes.push(this.searchedHeroes[i]);
            }
            return theseHeroes;
        } catch {
            //If api hasnt recieved list yet return empty list to prevent error
            return [];
        }
    }

    /**
        This creates our pages for us, and allows us to split our results into groups of 9
    */
    get pages() {
        try {
            let tempPages = [];
            let tempPage = 1;
            for (let k = 0; k < this.searchedHeroes.length; k = k + 9) {
                tempPages.push({ label: tempPage, value: tempPage });
                tempPage++;
            }

            return tempPages;
        } catch {
            return [{ label: "1", value: "1" }];
        }
    }
    /**
        increases page number by 1 on user input
    */
    nextPage(event) {

        if ((this.currentPage) * 9 < this.searchedHeroes.length) {

            this.currentPage++;

        }

    }
    /**
        Decreases Page number by 1 on user input
    */
    previousPage(event) {

        if ((this.currentPage) > 1) {
            this.currentPage--;

        }

    }
    /**
        Event that runs for our dropdown page swlect menu that runs when a page
    */
    pageSelect(event) {
        this.currentPage = event.detail.value;

    }
    /**
        This event opens our modal with the current heroes that we clicks on information
    */
    openModal(event) {
        this.viewableModal = !this.viewableModal;
        this.currentHero=event.srcElement.id;
       
    }




}