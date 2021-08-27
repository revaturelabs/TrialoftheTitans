import { LightningElement, api } from 'lwc';
import runScheduler from '@salesforce/apex/HeroLoginApexController.runScheduler';


export default class heroLogin extends LightningElement 
{
    @api message = "";

    async scheduleAssessment(){

        let retRun = await runScheduler({
            
            "username" : this.template.querySelector('[data-id="username"]').value,
            "cron" : this.template.querySelector('[data-id="cron"]').value,
            "jobName" : this.template.querySelector('[data-id="jobName"]').value
            });

        this.message = retRun;
    };

}