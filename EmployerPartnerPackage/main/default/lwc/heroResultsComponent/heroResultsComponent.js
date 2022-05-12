import hero from '@salesforce/resourceUrl/hero';
import { LightningElement, track , api} from 'lwc';


export default class HeroResultsComponent extends LightningElement {
    //This is being grabbed from employerPartnerExperience

    @api heroes=[];
    @track msg = 'newest';
    @track currentPage=1;
    @track remote;
    @track relocate;
    @track viewable= false;
    
   /* async nextPage(event){

        if((this.currentPage+1)*9<this.heroes.length){
            this.currentPage= [];
            
            let start= 9*(this.currentPage-1);
            let end = (9*this.currentPage);
            for (let i = start; i < heroes.length && i< end; i++) {
                this.currentHeroes.push(this.heroes[i]); 
            }
        }
        this.currentPage=this.currentPage+1;
        }
*/
    get currentHeroes(){
            try{let theseHeroes=[];
            let start= 9*(this.currentPage-1);
            let end = (9*this.currentPage);
            for (let i = start; i < this.heroes.length && i< end; i++) {
                theseHeroes.push(this.heroes[i]); 
            }
            return theseHeroes;
            }
            catch{
                return[];
            }
    }
    get pages(){
        try{
            let tempPages=[];
            let tempPage=1;
        for (let k = 0; k < this.heroes.length; k= k+9) {
            tempPages.push({ label: tempPage, value: tempPage });
            tempPage++;
            }
            return tempPages;
        }
        catch{
            return [{ label: "1", value: "1" }];
        }
    }
    handleCustomEvent(evt){
    
        this.msg = evt.detail.query;
        this.remote = evt.detail.remote;
        this.relocate = evt.detail.relocate;
    
    }    
    nextPage(event){
        
        if((this.currentPage)*9<this.heroes.length){

            this.currentPage++;

        }
        
        }
    previousPage(event){
        
        if((this.currentPage)>1){
            this.currentPage--;

        }
        
    }
    pageSelect(event){
        this.currentPage = event.detail.value;

    }
    



}