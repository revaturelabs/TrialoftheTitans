import { LightningElement, wire, track } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import GetQues from "@salesforce/apex/QuestionTableApexController.GetQues";
import GetPool from '@salesforce/apex/QuestionTableApexController.GetPool';
import addQues2Pool from '@salesforce/apex/QuestionTableApexController.addQues2Pool';
import getQCQuestion from '@salesforce/apex/QCQuestionEditController.getQCQuestion';
import TickerSymbol from '@salesforce/schema/Account.TickerSymbol';

export default class QuestionTableLWC extends LightningElement {

    //Variable declarations
    objectApi;

    @track mydata;
    pools;
    mycolumns = [
        { label: 'Question Title', fieldName: 'Name', type: 'text' },
        { label: 'Question Text', fieldName: 'Question_Text', type: 'text' },
        { label: 'Question Type', fieldName: 'Question_Type', type: 'text' }
    ];
    selectedPools = [];
    selectedRows = [];
    enableToast = true;

    searchKeyword  = '';

    //Added by me
    minNum;
    maxNum;

    pageSize = 10;
    pageNumber = 0;
    isLastPage;
    dataSize = 0;

    //Added by me. Set to true if page # is 1
    firstPage = true;

    connectedCallback(){

        this.searchQues(null);

        //Sets min and max number based on the first page size
        this.minNum = 0;

        if(this.dataSize == 0){
            this.maxNum = 0;
        }else{
            this.maxNum = this.dataSize - 1;
        }
    }

    //Returns the questions from the apex controller based on page size, number and search keyword
    searchQues(event){

        //Ensures that the initial call of searchQues does not error from being called with null
        if(event == null){
            this.searchKeyword = '';
        }else{
            this.searchKeyword = event.detail.value;
        }

        //Calls out to the apex controller for the questions
        GetQues({ searchKeyword: '$searchKeyword' }, { pageSize: '$pageSize' }, { pageNumber: '$pageNumber' })
        .then((result) =>{

            let rows = [];
            for (let i = 0; i < result.length; i++) {
                let items = {
                    Id: resultData[i].ques[0].Id,
                    Name: resultData[i].ques[0].Name,
                    Question_Text: resultData[i].ques[0].Question_Text__c,
                    Question_Type: resultData[i].ques[0].Question_Type__c
                };
                rows.push(items);
            }

            this.dataSize = rows.length;
            this.mydata = rows;

        })
        .catch((result) =>{
            console.log(error);
        })
        

    }

    //Returns the pools from the apex controller
    @wire(GetPool)
    pool({ error, data }) {

        if (error) {
            console.log(error);
        } else if (data) {

            let rows = [];
            for (let i = 0; i < resultData2.length; i++) {
                let items = {
                    Id: resultData2[i].assignedQues[0].Id,
                    Name: resultData2[i].assignedQues[0].Name
                };
                rows.push(items);
            }
            this.pools = rows;

        }

    }

    //Adds question to the selected pool in the apex controller
    addQuestion2Pool() {

        console.log('In add question 2 pool function');
        console.log(this.selectedPools.length);

        if (this.selectedPools.length > 0) {
            let arrayTextPools = this.selectedPools[0].split(';');
            var selectedObjectPools = [];

            console.log('First if');

            for (let i = 0; i < arrayTextPools.length; i++) {
                for (let j = 0; j < this.pools.length; j++) {
                    if (arrayTextPools[i] == this.pools[j].Name) {
                        selectedObjectPools.push(this.pools[j]);
                    }
                }
            }
        }else {
            selectedObjectPools = null;
            console.log('First else');
        }

        if(this.selectedRows.length <= 0 || this.selectedPools.length <= 0){
            
            selectedObjectPools = null;
            this.selectedRows = null;

            //Toast message
            if(this.enableToast){
                console.log('Nested if');
                const event = new ShowToastEvent({
                    variant : "error",
                    header : "Invalid selections!",
                    message : "Please select at least a question and a pool to add the question to the pool."
                })
                this.dispatchEvent(event);

            }
            // Exit function 
            return;
        }

        //Calls out to the apex controller
        addQues2Pool({pools: 'selectedObjectPools'}, {questions : 'questions'})
        .then((result) => {
            const event = new ShowToastEvent({
                title : 'Successfully added Questions to Pools',
                message: 'You can check the questions in pool !!!',
                duration:' 4000',
                key: 'info_alt',
                type: 'success',
                mode: 'pester'
            })
            this.dispatchEvent(event);

        })
        .catch((error) => {
        
            const event = new ShowToastEvent({
                title : 'Some of the questions are already in the pool',
                message: 'Duplicate Questions in pools will not be added !!!',
                duration:' 4000',
                key: 'info_alt',
                type: 'info',
                mode: 'pester'
            })
            this.dispatchEvent(event);
        })

    }


    //Updates selection when 
    updateSelectedRows(event) {
        var selectedRows = event.detail.value;
        this.selectedRows = selectedRows;
    }

    onMultiSelectChange(event){
        let selectedPools = event.detail.value;
        this.selectedPools = selectedPools;
    }

    //Does all logic to safely change pages
    changePage(i){

        let tempPage = this.pageNumber + i;

        if(tempPage <= 0){
            this.pageNumber = 0;
            this.firstPage = true;
        }else if((this.dataSize == this.pageSize) && this.dataSize != 0){
            this.pageNumber = tempPage;
            this.firstPage = false;
        }
        
        if(this.dataSize == 0 || this.pageSize == 0 || this.dataSize < this.pageSize){
            this.isLastPage = true;
        }

        this.minNum = this.pageNumber * this.pageSize;
        this.maxNum = this.minNum + this.dataSize;

    }

    //Shows next results
    handleNext() { 

        this.changePage(1);
        this.searchQues();
        
    }

    //Shows previous results
    handlePrev() {
        this.changePage(-1);
        this.searchQues();
    }

    //Changes the page size
    onSingleSelectChange(event) {   
        let singleResult = event.target.value;
        this.pageSize = singleResult;
        this.searchQues();
    }



}
