import { LightningElement, api } from 'lwc';

export default class LwcQCInterviewHeader extends LightningElement {
    @api CurrentStage = "Start";
    get getStart()
    {
        if(this.CurrentStage == "Start")
        {
            
            return true;
        }
        else{
            console.log(this.CurrentStage);
            return false;
        }
    }
    get getInterview()
    {
        if(this.CurrentStage == "Interview")
        {
            console.log(this.CurrentStage);
            return true;
        }
        else{
            console.log(this.CurrentStage);
            return false;
        }
    }
    get getEnd()
    {
        if(this.CurrentStage == "End")
        {
            console.log(this.CurrentStage);
            return true;
        }
        else{
            console.log(this.CurrentStage);
            return false;
        }
    }
}