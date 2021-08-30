import { api, LightningElement } from 'lwc';

//import Apex Controller methods
import getExams from'@salesforce/apex/TitanPageApexController.getExams';

export default class ExamsLandingM extends LightningElement {

    @api activeTitan='';
    @api examsList=[];


    //replacement of doinit from aura
    connectedCallback(){
        //helper.hSetExams(component, event);
        console.log('exam landing is connected');
        this.doInit(this.event);

    }

    isExamZero(){
        return this.examsList.length === 0;
    }

    doInit(event){
        this.hSetExams(event);
    }

    cRenderExams(event){
        this.hRendersExams(event);
    }

    cSetExams(event){
        this.hSetExams(event);
    }

    hRendersExams(event){
        event.preventDefault();
        var renderExams = new CustomEvent('ExamsLandingEvent', {detail:{'titanId':this.activeTitan.Id}});
        this.dispatchEvent(renderExams);
    }

    hSetExams(event){
        
        let activeTitan = this.activeTitan.Id;
        console.log('Active Titan Id: ' + activeTitan);
        getExams({titanId: this.activeTitan.Id}).then(response =>{
            this.examsList = response;
            console.log("Returned Exams: ");
            console.log(response);
        });
    }
}