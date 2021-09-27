import { LightningElement, api } from 'lwc';

export default class LwcQCInterviewHeader extends LightningElement {
    CurrentStage = "Start";
    getStart()
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
    getInterview()
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
    getEnd()
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