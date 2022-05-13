import hero from '@salesforce/resourceUrl/hero';
import { LightningElement, track , api} from 'lwc';


export default class HeroResultsComponent extends LightningElement {
    //This is being grabbed from employerPartnerExperience


    @track msg = 'new';
    @track pages={};

    @api heroes=[];
    @track searchedHeroes=[];

    @track currentPage=1;
    @track remote;
    @track relocate;
    @track viewable= false;
    

    get currentHeroes(){
        try{
            let theseHeroes=[];
            let start= 9*(this.currentPage-1);
            let end = (9*this.currentPage);
            for (let i = start; i < this.searchedHeroes.length && i< end; i++) {
                theseHeroes.push(this.searchedHeroes[i]); 
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
        for (let k = 0; k < this.searchedHeroes.length; k= k+9) {
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
        this.searchedHeroes = [];
        this.heroes.forEach(hero => {
            if(this.msg==hero.Name||this.msg==hero.Location||this.msg==hero.Technology){
                this.searchedHeroes.push(hero);
            }
        });
    
    }    
    nextPage(event){
        
        if((this.currentPage)*9<this.searchedHeroes.length){

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