import { LightningElement, api } from 'lwc';

export default class QcInterviewHeroReviewFlagRowLightning extends LightningElement {
    @api flag;
    @api flagName;
    @api flagDescription;
    @api flagType;
    @api rowIndex = 0;
<<<<<<< HEAD

    AddRow(){
        this.dispatchEvent(new CustomEvent('QCInterviewHeroReviewAddRowEvent'));
    }

    DeleteRow(){
        this.dispatchEvent(new CustomEvent('QCInterviewHeroReviewDeleteRowEvent',{index: this.rowIndex}));
    }
=======
>>>>>>> c4fb038 (Squashed commit of the following:)
    
    submit(){
        this.dispatchEvent(new CustomEvent('CreateFlag', {flagName: this.flagName, flagDescription: this.flagDescription, flagType: this.flagType}));
    }
}