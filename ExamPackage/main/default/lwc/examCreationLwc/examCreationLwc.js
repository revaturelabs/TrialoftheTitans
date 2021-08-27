import { LightningElement, api } from 'lwc';
import GetQuestionPool from '@salesforce/apex/ExamCreationAuraController.GetQuestionPool';
import GetExamQuestions from '@salesforce/apex/ExamCreationAuraController.GetExamQuestions';
import CreateExamAssignment from '@salesforce/apex/ExamCreationAuraController.CreateExamAssignment';
export default class ExamCreationLwc extends LightningElement 
{
    @api examId;
    @api examCreated = false;
    @api questionPool;
    @api questionPoolMap;
    @api questionShow;
    @api draftValuesMap;
    @api currentPage = 1;
    @api isLastPage;
    @api searchKeyword; 
    @api poolDataColumns;
    @api questionDataColumns;
    @api recordId;

    
        // get questions pools and set the columns of the two datatable
        constructor(){
            super();
            // control each column of data table
            // left table
            this.poolDataColumns =
                          [	  {label: 'Pool Name', fieldName: 'poolName', type: 'text'},
                              {label: 'Amount Question Add', fieldName: 'quantity', type: 'number', editable: true},
                              {label: 'Amount Of Questions', fieldName: 'poolQuestionAmount', type: 'number'},
                              {type : 'button', label: 'Preview Questions',
                               typeAttributes: {
                                   label: 'Questions',
                                   iconPosition: 'right',
                                   iconName: 'utility:chevronright',
                                   variant: 'brand'
                               }
                              }
                          ];
            
            // right table
            this.questionDataColumns =
                          [
                              {label: 'Question Title', fieldName: 'Name', type: 'text'},
                              {label: 'Question Text', fieldName: 'Question_Text__c', type: 'text'},
                              {label: 'Question Answer', fieldName: 'Correct_Answer_s__c', type: 'text'},
                              {label: 'Options', fieldName: 'Options__c', type: 'text'}
                              
                          ];
            this.SetInitialQuestionPool(); 
        }

        // show the questions in a pool, when clicking questions button in any row.
        // currently querying everytime a questions button is clicked.
        // should be fine, since they unlikely to review all the questions in every pool.
        async ShowQuestionInPool (event){ //converted
            this.questionShow = await GetExamQuestions({ poolId : event.detail.row.poolId});
        }

        // save the exam Id on creation of exam.
        // use to insert question pool.
        HandleSuccess (event){ //converted
            this.examId = event.detail.id;
            this.examCreated = true;
        }

        // send all modified question pool to be add to question assignment.
        HandleCreation (){ //converted
            this.examCreated = false;
            //removed because there is no place to create exam from this screen idk why it was here 
            //CreateExamAssignment({examId: this.examId, poolAndNumber : this.draftValuesMap})
        }

        // update map on inline edit of question pool
        UpdateQuestionQuantity (event){ //converted
            let draftVal = event.detail.draftValues;//event.getParam('draftValues'); //right table
            let draftMap = this.draftValuesMap;
            let questionPool = this.questionPool;
            // Need to validate the number entered by user
            // so they don't ask for more question than what is in the pool
            draftMap[draftVal[0].poolId] = draftVal[0].quantity;
            this.draftValuesMap = draftMap;
        }

        // go to prev page
        HandlePrev (){ //converted    
            if (this.currentPage - 1 > 1){
                let myMap = this.questionPoolMap;
                let currentPage = this.currentPage - 1;
                this.questionPool = myMap[currentPage];
                this.currentPage = currentPage;
                this.isLastPage = false;
            }
        }

        // go to next page
        HandleNext(){ //converted
            let myMap = this.questionPoolMap;
            if(!myMap[this.currentPage+1]){
                this.isLastPage = true;
            }else{
                let currentPage = this.currentPage+1;
                this.questionPool = myMap[currentPage];
                this.currentPage = currentPage;
            }   
        }

        async SetInitialQuestionPool(){
            let ret = await GetQuestionPool({searchKeyword : ""});
            this.questionPoolMap = ret;

            // set to first page
            this.questionPool = ret[1];

            // set lastpage to true when there is no page two in map.
            if(!ret[2]){
                this.isLastPage = true;
            }
        }
    
        // get question pools from server
        // currently getting all of them
        // unless searchbar is triggered
        async GetQuestionPools () { //converted

            this.searchKeyword = this.template.querySelector('[data-id="searchField"]').value;

            if (this.searchKeyword != null){ //probs needs an empty string check w something that resets to all results
                
                let ret = await GetQuestionPool({searchKeyword : this.searchKeyword});
                this.questionPoolMap = ret;

                // set to first page
                this.questionPool = ret[1];

                // set lastpage to true when there is no page two in map.
                if(!ret[2]){
                    this.isLastPage = true;
                }
            }
        }
}