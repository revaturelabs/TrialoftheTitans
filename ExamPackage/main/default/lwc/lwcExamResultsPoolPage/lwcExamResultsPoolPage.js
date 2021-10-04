import { LightningElement, wire, api } from 'lwc';
import GetCorrectExamResultPoolQuestions from '@salesforce/apex/ExamResultsPoolPageAuraController.GetCorrectExamResultPoolQuestions';
import GetAllExamResultPoolQuestions from '@salesforce/apex/ExamResultsPoolPageAuraController.GetAllExamResultPoolQuestions';

export default class LwcExamResultsPoolPage extends LightningElement {
    // these were the Aura:attributes 
    TogglePoolInfo = true;

    @api recordId; 
    examResultId;
    scriptsLoaded = false;
    ExamResultPoolQuestions; 
    allQuestions;
    correctQuestions;
    readyToRun = false;
    isListEmpty = true;

    //upon component connected, retrieve all questions from exam results that are 
    //  within a question pool and set to an attribute
    connectedCallback() {
        this.examResultId = this.recordId; // <--- this one is required for the page to work
        this.ToggleExamPoolPercentage();    
    }



    @wire(GetCorrectExamResultPoolQuestions,{examResultId:'$examResultId'})
    correctAnswerPool({error, data}) {
        if (data) {
            console.log("collected correctly answered questions:",data);
            this.correctQuestions = data;
            if (this.readyToRun) { // if statement insures 
                this.CalculatePoolPercentage(this.correctQuestions);                  
            }
            else{
                this.readyToRun = true;
            }
        }
        else if (error) {
            console.log('No correct answers in a pool');
        }
    }

    @wire(GetAllExamResultPoolQuestions,{examResultId : '$examResultId'})
    allAnswerPool({error, data}) {
        if (data) {
            console.log("collected ALL questions:", data);
            this.allQuestions = data;
            this.ExamResultPoolQuestions = data;
            this.isListEmpty=false;
            if (this.readyToRun) {
                this.CalculatePoolPercentage(this.correctQuestions);                  
            }
            else{
                this.readyToRun = true;
            }
        }
        else if (error) {
            console.log('No Pools in this Exam');
        }
    }

    

    //  NOT FUNCTIONING YET - toggles the visibility for the pool percentages
    ToggleExamPoolPercentage () {
        // component.set("v.TogglePoolInfo", component.get("v.TogglePoolInfo"));
    }

    //creates an object for all exam result questions in a pool 
    //and all correct exam result questions in a pool, compares the pool
    CalculatePoolPercentage (correctExamResultPoolQuestions) {          // it is my opinion that this function is too long and unneccisarily complicated (especially now that i've converted it to LWC) also, i really feel that the inline functions don't actually make the code easier to read but javascript isn't my first language
        let correctPoolQuestionsObj = {};
        let allPoolQuestionsObj ={};
        let resultsObject ={};
        let key;
        let initValue;
        let fixedValue;

        // creates an object to count correct answer frequency for each pool through key/value pairs
        // in the case of duplicate questions... if you answered correctly on any of the duplicate questions, you get it right and it only counts as one question
        //                                      this bug/feature may fall under buisness logic and should be taken up with someone higher up the chain than me
        correctExamResultPoolQuestions.forEach(item => {
            // if 'item' exists in correct pool questions
            if(correctPoolQuestionsObj[item]){
                correctPoolQuestionsObj[item]++;   // then increase it's value's count
            }else{
                correctPoolQuestionsObj[item] = 1;  // otherwise, add it to the list and init its value to 1
            }
        });

        //create an object to count answer frequency for each pool through key/value pairs
        console.log('before JSON',this.ExamResultPoolQuestions)
        let allExamResultPoolQuestions =  JSON.parse(JSON.stringify(this.ExamResultPoolQuestions));
        console.log('HERE',allExamResultPoolQuestions);

        allExamResultPoolQuestions.forEach(item => {
            if(allPoolQuestionsObj[item]){
            allPoolQuestionsObj[item]++;
            }else{
            allPoolQuestionsObj[item] = 1;
            }
        });

        //Nested for loop to compare the correctPoolQuestionsObj and allPoolQuestionsObj objects pool name
        //Then divide the correct number of answer with all answer found in the respective pool, 
        //then take that value and fix it.  
        for (let i = 0; i < Object.keys(correctPoolQuestionsObj).length; i++){

            for (let j = 0; j < Object.keys(allPoolQuestionsObj).length; j++){

                if(Object.keys(correctPoolQuestionsObj)[i] == Object.keys(allPoolQuestionsObj)[j]){

                    key = Object.keys(correctPoolQuestionsObj)[i];
                    initValue = (correctPoolQuestionsObj[Object.keys(correctPoolQuestionsObj)[i]] / allPoolQuestionsObj[Object.keys(allPoolQuestionsObj)[j]]) * 100;
                    fixedValue = initValue.toFixed(2); 
                    resultsObject[key] = fixedValue; 
                }
            }
        }
        this.ExamResultPoolQuestions = Object.entries(resultsObject).map(([key, value]) => ({key,value}));
        // let mapForAttribute = ExamResultPoolQuestions;
        //component.set("v.ExamResultPoolQuestions", mapForAttribute); // related to broken code below
        //this.drawD3(component, event, mapForAttribute)
        // console.log("Attribute Finalized: ");
        // console.log(component.get("v.ExamResultPoolQuestions"));
        // console.log("Correct Answers: ");
        // console.log(correctPoolQuestionsObj);
        // console.log("All Answers: ");
        // console.log(allPoolQuestionsObj);  
        }

        // this code... *sigh. I don't know who wrote it, but read it in the context of an aura 
        //              component JS Helper if you want to desipher and implement it
        // drawD3(mapForAttribute) {

        //     let obj = {};
        //     mapForAttribute.forEach(pair => {
        //         obj[pair.key] = pair.value
        //     })
        //     let sortable = [];
        //     for (let key in obj) {
        //         sortable.push([key, obj[key]])
        //     }
        //     sortable.sort(function(a, b) {
        //         return b[1] - a[1];
        //     })
        //     let objSorted = {}
        //     sortable.forEach(pair => {
        //         objSorted[pair[0]] = pair[1]
        //     })
            
        //     for (let i = 0; i < Object.keys(objSorted).length; i++) {
        //         // console.log(myJson[Object.keys(myJson)[i]])
        //         // myHtml += `<div data-score="${myJson[Object.keys(myJson)[i]]}"></div>`
        //         $A.createComponent(
        //             "aura:html", {
        //                 "tag": 'div',
        //                 "body": `${Object.keys(objSorted)[i]}...${objSorted[Object.keys(objSorted)[i]]}%`,
        //                 "HTMLAttributes": {
        //                     "style": `--i:${objSorted[Object.keys(objSorted)[i]]}%; --y:${objSorted[Object.keys(objSorted)[i]] * 0.9}%`,
        //                     // "onclick": cmp.getReference("c.onExamClick"),
        //                     "class": `bar-chart ${objSorted[Object.keys(objSorted)[i]] >= 75 ? 'pass' : 'fail'}`,
        //                     // "data-score": `${myJson[Object.keys(myJson)[i]]}%`
        //                 }
        //             },
        //             function(newButton, status, errorMessage){
        //                 //Add the new button to the body array
        //                 if (status === "SUCCESS") {
        //                     var body = cmp.get("v.body");
        //                     body.push(newButton);
        //                     cmp.set("v.body", body);
        //                 }
        //                 else if (status === "INCOMPLETE") {
        //                     console.log("No response from server or client is offline.")
        //                     // Show offline error
        //                 }
        //                 else if (status === "ERROR") {
        //                     console.log("Error: " + errorMessage);
        //                     // Show error message
        //                 }
        //             }
        //         );
        //     } 
        // }
        
}