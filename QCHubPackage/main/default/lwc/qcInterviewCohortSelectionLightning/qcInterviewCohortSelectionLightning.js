import { LightningElement, api} from 'lwc';

export default class QcInterviewCohortSelectionLightning extends LightningElement {
    @api columns =  [   {label:'Hero', fieldName:'Name'}, 
                        {label:'Squad Name', fieldName:'Squad__r.Name', type:'text'},
                        {label:'', fieldName:""},
                    {type:'button', 
                        typeAttributes: {
                            name: 'start',
                            label: 'Interview',
                            iconPosition: 'left',
                            iconName: 'utility:add',
                            variant: 'Success',
                            disabled: false,  
                        }
                    }
                    ];
    @api herolist;
    @api interviewList;
    @api currentHero;
    @api currentCohort;
    connectedCallback(){
        this.dispatchEvent(new CustomEvent('getHeros',{cohort: this.currentCohort}));
        this.dispatchEvent(new CustomEvent('getInterviews',{heroes: this.heroList}));
    }
    handleRowSelection(){
        this.currentHero = event.getParam('selectedRows')[0];
    }
    LaunchInterview(){
        this.dispatchEvent(new CustomEvent('InterviewHeroEvent',{"SelectedHero" : 'row'}));
    }
}