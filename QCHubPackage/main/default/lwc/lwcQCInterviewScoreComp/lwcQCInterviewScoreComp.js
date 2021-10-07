import { LightningElement, api } from 'lwc';

export default class LwcQCInterviewScoreComp extends LightningElement 
{
    @api HeroScore = 0;
    PlusClick()
    {

       
        this.HeroScore++;
    }

    MinusClick()
    {

        if(this.HeroScore > 0)
        {
            this.HeroScore--;
        }

    }
}


