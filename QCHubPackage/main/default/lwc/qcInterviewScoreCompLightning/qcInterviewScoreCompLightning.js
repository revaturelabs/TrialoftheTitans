import { api,LightningElement } from 'lwc';

export default class QcInterviewScoreCompLightning extends LightningElement {
    @api HeroScore;

    connectedCallback(){
        this.HeroScore = 0;
    }
    PlusClick(){
        this.HeroScore = this.HeroScore + 1;
    }
    MinusClick(){
        if(this.HeroScore > 0){
            this.HeroScore = this.HeroScore - 1;
        }
    }
}