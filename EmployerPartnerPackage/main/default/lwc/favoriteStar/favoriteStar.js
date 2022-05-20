import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class FavoriteStar extends LightningElement {

    //Star/Favorite state will default to an off toggle state (TRACKED, do I need to expose w/ @api so other components can see it?).
    @track favoriteState = false;

    //Variable that holds Parent object data of type String (Heroe's name).
    @api currenthero;

    //Method that handles when "Favorite" button icon is selected. (Might need to be exposed w/ @wire or @api)
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