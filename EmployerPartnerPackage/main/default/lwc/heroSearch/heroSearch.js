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
           if(evt.target.value == false){
               alert("Try to search for a name, technology, or location.");
           }else{
            this.search.query = evt.target.value;
            this.search.remote = this.remote;
            this.search.relocate = this.relocate;
            this.dispatchEvent(new CustomEvent('testevent', {
                detail : this.search
            }));
            
            }}
    }
    handleSearchButton() {
        let x =this.template.querySelector(".searchTerm").value;
        if(x == false){
            alert("Try to search for a name, technology, or location.");
        }else{
        this.search.query = this.template.querySelector(".searchTerm").value;
         this.search.remote = this.remote;
        this.search.relocate = this.relocate;
        this.dispatchEvent(new CustomEvent('testevent', {
            detail : this.search
        }));
        
        }}
        
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
        if(!this.isAdvancedSearch){
        this.isAdvancedSearch = !this.isAdvancedSearch;
        }else{
        this.isAdvancedSearch = !this.isAdvancedSearch;
        this.remote = false;
        this.relocate = false;
        }
    }
     advDetailChange(){
        this.remote= !this.remote;
        
        

     }
     advDetailChangeTwo(){
        this.relocate= !this.relocate;
        
        

     }




}