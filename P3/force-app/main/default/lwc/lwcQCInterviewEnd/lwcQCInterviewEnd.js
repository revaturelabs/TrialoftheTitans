import { LightningElement, api } from 'lwc';

export default class LwcQCInterviewEnd extends LightningElement {
    @api heroName="";
    @api heroId="";
    @api cohortId="";
    
    @api answers=[{}];
  
    @api week="";

}