/*
    AUTHOR: Daniel Alcala
    CREATION: 2022-05-12

    LAST MODIFIED: 2022-05-23

    -LWC for 'Favorite' funtionality, will be a button from 'utility' that depicts a star.
        Nested in Parent component: heroResultsComponent.html (inside LWC's {currentHeroes} for-loop).

    -JAVASCRIPT logic
*/

import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class FavoriteStar extends LightningElement {

    //Star/Favorite state will default to an off toggle state (TRACKED).
    @track favoriteState = false;

    //Variable that holds Parent object data of type Hero. (hero(user) object) CURRENTLY NOT UTILIZED.
    @api currenthero;

    //Method that handles when "Favorite" button icon is selected. ALL LOGIC SHOULD BE HOUSED HERE.
    handleFavoriteClick(){
        this.favoriteState = !this.favoriteState;

        //Toast Message Logic

        //Condition: unfavorited, BASE: Favorited
        if (!this.favoriteState){
            this.unfavoriteToast();
        }
        else{
            //Since default state is false, this will serve as the base condition.
            this.favoriteToast();
        }
       

    }
    //Helper success favorite select toast message.
    favoriteToast(){
        const event = new ShowToastEvent({
            title: 'Favorite Added!',
            //message: 'User: ' + currenthero + ' has been added to your favorite(s) list!',
            message: 'This user has been added to your favorite(s) list!',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }

    //Helper informational favorite de-select toast message.
    unfavoriteToast(){
        const event = new ShowToastEvent({
            title: 'Favorite Removed!',
            //message: 'User: ' + currenthero + ' has been removed from your favorite(s) list!',
            message: 'This user has been removed from your favorite(s) list!',
            variant: 'info',
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }
}