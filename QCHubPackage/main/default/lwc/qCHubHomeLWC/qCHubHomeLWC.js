import { api, LightningElement } from 'lwc';
import {CohortButtons} from "@salesforce/apex/QCHubHomeAuraController.UploadInterviewData";
    
export default class QCHubHomeLWC extends LightningElement {
    @api CohortList;
    @api SelectedCohort;
    @api NoCohortSelected;
    @api Hero;
    @api HeroList;
    @api contextInfo;
    @api SquadList;
    @api WeekList;
    @api ScriptLoaded=false;
    @api DataLoaded=false;
    @api resourceD3 = "$Resource.d3/d3.js";
    connectedCallback(){
        this.NoCohortSelected=true;
        LoadHeros();
        LoadCohorts();
        LoadWeeks();
    }

}