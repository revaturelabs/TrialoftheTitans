import { LightningElement, track } from 'lwc';

export default class HeroSearch extends LightningElement {
    queryTerm;
    isAdvancedSearch;
    input1;
    input2;
    @track msg
    @track remote;
    @track relocate;
    msg = 'lol';
    search = {queryTerm, remote, relocate};

    handleKeyUp(evt) {
        const isEnterKey = evt.keyCode === 13;
        if (isEnterKey) {
            this.queryTerm = evt.target.value;
            }
    }
    handleSearchButton() {
        this.queryTerm = this.template.querySelector(".searchTerm").value;
            
            
        
    }
    testEvent(){
        this.msg = 'dumb';
        this.dispatchEvent(new CustomEvent('testevent', {
            detail : search
        }));
        
        
        
    }
    handleCustomEvent(evt){
        const textTest = evt.detail;
        this.msg = textTest;
        this.msg = 'lololol'
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