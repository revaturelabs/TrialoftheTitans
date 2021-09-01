import { api , LightningElement, wire } from 'lwc';
import {setInterview} from "@salesforce/apex/QCInterviewHeroReviewAuraController.setInterview";
import {UploadInterviewData} from "@salesforce/apex/QCInterviewHeroReviewAuraController.UploadInterviewData";

export default class QCInterviewHeroReviewLWC extends LightningElement {
    @api interview;
    @api columns;
    @api answers;
    @api flagList;
    @api makeFlag=false;
    @api week;

    @api heroName;
    @api heroId;
    @api cohortId;
    @api newFlagName;
    @api newFlagDesc;
    @api newFlagType;

    @wire (setInterview) setInterview;
    @wire (UploadInterviewData) UploadInterviewData;

    constructor(){
        super();
        target.addEventListener("CreateFlag", this.handleCreateFlag);
    }
    
    connectedCallback(){
        console.log("QCINTERVIEWHEROREVIEW INIT:");
        this.columns= 
            [
                {label:'Score', fieldName:'Score__c'},
                {label:'Question', fieldName:'Question__c'},
                {label:'Answer', fieldName:'Hero_Answer__c'},
            ];
        
        //helper.getInterview(component, event)
        createFlag(event);
    }

    //initializes row 1 of flags
    createFlag (event) {
        let RowItemList = this.flagList;
        RowItemList.push({
            'sobjectType': 'QC_Flag__c',
            'Name': '',
            'Description': '',
        })
        this.flagList=RowItemList;
    }

    // creates new row on button click
    AddNewRow (event) { 
        createFlag(event);
    }

     // validation for requiring description on row save
     validateFlags (event) {
        var isValid = true;
        var flagRows = this.flagList;
        for (var index = 0; index < flagRows.length; index++) {
            if (flagRows[index].Description__c == '') {
                isValid = false;
                alert('Description required for Row ' + (index + 1));
            }
        }
        return isValid;
    }

     // should handle getting params for insert and upsert of flags and interview
     async setFlags (event) {
        try{
        var flags = await this.flagList;

        flags.flags = this.flagList;
        }
        catch(error){
            console.log("There was an error.");
        }
    }

    async finalizeInterview (event) {
        try{
        var interview = await this.setInterview;

        interview.interview = this.setInterview;
        }
        catch(error){
            console.log("There was an error.");
        }
    }

    LaunchStageEvent (stage){
        this.dispatchEvent(new CustomEvent("UpdateStageEvent"), {StageName:stage});
    }
        
    async SubmitInterview (HeroId, HeroName, CohortId, Week, HeroAnswers, Flags, newFlagName, newFlagDesc, newFlagType){
        
        console.log("SubmitInterview helper");

        console.log(HeroId);
        console.log(HeroName);
        console.log(CohortId);
        console.log(Week);
        console.log(HeroAnswers);
        


        var HeroAnswersStr = [];
        
        console.log(HeroAnswersStr);

        
        for (let hA of HeroAnswers){
            HeroAnswersStr.push(JSON.stringify(hA));
        }
        
		console.log("Something");
        console.log(HeroAnswersStr);
        
        /*
        var FlagsStr = [];
		console.log(Flags.length);
        if (Flags.length != 0){
            console.log("Stuff");
        	for (let f of Flags){
            	FlagsStr.push(JSON.stringify(f));
        	}
        }
        */
        
        console.log("Stringification complete");
    try {
        let interviewSubmit = this.UploadInterviewData;
		
        console.log("REFERENCE RETRIEVED");
        let FlagsStr = "";
        interviewSubmit = 
        [
            {cohortId : CohortId,
            heroId : HeroId,
            heroName : HeroName, 
            week : Week, 
            qaStrList : HeroAnswersStr, 
            qaStrFlags : FlagsStr, 
            fname:newFlagName, 
            fdesc: newFlagDesc, 
            ftype: newFlagType}
        ]

        console.log("PARAMETERS SET");

        interviewSubmit.setCallback(this, function(response){
            
            let state = response.getState();

            if (state === "SUCCESS"){
                console.log(state);
                let navService2 = component.find("navService2");
                let interviewFinalReference = {
                            type: 'standard__recordPage',
                            attributes: {
                                    actionName: 'view',
                                    recordId: response.getReturnValue()
                            },
                            state: {
                            }
    
                }
                navService2.navigate(interviewFinalReference);

            }
            
            else if (state === "INCOMPLETE"){
                console.log(state);

            }

            else if (state === "ERROR"){
                console.log(state);
                var errors = response.getError();

                if (errors) {
                    if (errors[0] && errors[0].message){
                        console.log("Error message: " + errors[0].message);

                    }

                }
                else {
                    console.log("Unknown error");

                }

            }
        });
        console.log("ENQUEUEING ACTION...");
        $A.enqueueAction(interviewSubmit);
        console.log("ACTION ENQUEUED.");
    }

    catch (error) {
        console.log ("There was an error.");
    }
}


}
