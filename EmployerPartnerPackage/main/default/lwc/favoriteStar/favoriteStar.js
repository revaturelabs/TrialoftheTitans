import { LightningElement, track, api } from 'lwc';

export default class FavoriteStar extends LightningElement {

    //Star/Favorite state will default to an off toggle state (TRACKED, do I need to expose w/ @api so other components can see it?).
    @track favoriteState = false;

    //Method that handles when "Favorite" button icon is selected. (Might need to be exposed w/ @wire or @api)
    handleFavoriteClick(){
        this.favoriteState = !this.favoriteState;
    }
}