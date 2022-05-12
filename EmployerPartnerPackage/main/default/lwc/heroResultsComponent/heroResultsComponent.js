import hero from '@salesforce/resourceUrl/hero';
import { LightningElement, track , api} from 'lwc';


export default class HeroResultsComponent extends LightningElement {
    //This is being grabbed from employerPartnerExperience

    @api heroes;
    
    handleCustomEvent(evt){
        const textTest = evt.detail;
        this.msg = textTest;
        
    }

    @track currentHeroes=[];
    @api heroes =[];
    @track pages= [];
    @track currentPage=1;
    nextPage(event){
        
        if((this.currentPage)*9<this.heroes.length){
            this.currentHeroes=[];
            this.currentPage++;
            let start= 9*(this.currentPage-1);
            let end = (9*this.currentPage);
            for (let i = start; i < this.heroes.length && i< end; i++) {
                this.currentHeroes.push(this.heroes[i]); 
            }
        }
        
        }
    previousPage(event){
        
        if((this.currentPage)>1){
            this.currentHeroes=[];
            this.currentPage--;
            let start= 9*(this.currentPage-1);
            let end = (9*this.currentPage);
            for (let i = start; i < this.heroes.length && i< end; i++) {
                this.currentHeroes.push(this.heroes[i]); 
            }
        }
        
    }
    pageSelect(event){
        this.currentPage = event.detail.value;
        this.currentHeroes=[];
        let start= 9*(this.currentPage-1);
        let end = (9*this.currentPage);
        for (let i = start; i < this.heroes.length && i< end; i++) {
            this.currentHeroes.push(this.heroes[i]); 
        }
    }
    
    initializeSearch(event) {
        this.currentHeroes=[];
        this.currentPage=1;
        this.pages=[];
       for (let i = 0; i < 9 && i<this.heroes.length; i++) {

            this.currentHeroes.push(this.heroes[i]); 
        }
        let tempPage=1;
        for (let k = 0; k < this.heroes.length; k= k+9) {
            this.pages.push({ label: tempPage, value: tempPage });
            tempPage++;
        }
    }
    



}