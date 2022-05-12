import { LightningElement, track, api } from 'lwc';

export default class HeroSearch extends LightningElement {
    
    isAdvancedSearch;
    input1;
    input2;
    @api msg;
    remote = false;
    relocate = false;
    
    @track search = {'query': this.queryTerm, 'remote': this.remote, 'relocate': this.relocate};

    handleKeyUp(evt) {
        const isEnterKey = evt.keyCode === 13;
        if (isEnterKey) {
           
            this.search.query = evt.target.value;
            this.search.remote = this.remote;
            this.search.relocate = this.relocate;
            this.dispatchEvent(new CustomEvent('testevent', {
                detail : this.search
            }));
            
            }
    }
    handleSearchButton() {
        this.search.query = this.template.querySelector(".searchTerm").value;
         this.search.remote = this.remote;
        this.search.relocate = this.relocate;
        this.dispatchEvent(new CustomEvent('testevent', {
            detail : this.search
        }));
        
        }
        
    handleCustomEvent(evt){
        const textTest = evt.detail;
        this.msg = textTest;
        
    }

    buttonStatefulState = false;
    buttonIconStatefulState = false;

    handleButtonStatefulClick() {
        this.buttonStatefulState = !this.buttonStatefulState;
    }

    handleButtonIconStatefulClick() {
        this.buttonIconStatefulState = !this.buttonIconStatefulState;
    }
    handleAdvancedClick() {
        this.isAdvancedSearch = !this.isAdvancedSearch;
    }
    handleQuickClick(){
        this.isAdvancedSearch = !this.isAdvancedSearch;
    }
     advDetailChange(){
        this.remote= !this.remote;
        

     }
     advDetailChangeTwo(){
        this.relocate= !this.relocate;
        

     }




}