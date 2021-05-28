({
    // get questions pools and set the columns of the two datatable
    init : function(component, event, helper){
        component.set("v.poolDataColumns",
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
                      ]);
        component.set("v.questionDataColumns",
                      [
                          {label: 'Question Title', fieldName: 'Name', type: 'text'},
                          {label: 'Question Text', fieldName: 'Question_Text__c', type: 'text'},
                          {label: 'Question Answer', fieldName: 'Correct_Answer_s__c', type: 'text'},
                          {label: 'Options', fieldName: 'Options__c', type: 'text'}
                          
                      ]);
        helper.getQuestionPools(component);
        console.log(component.get("v.examId"));
    },
    // show the questions in a pool, when clicking questions button in any row.
    // currently querying everytime a questions button is clicked.
    // should be fine, since they unlikely to review all the questions in every pool.
    // but can changed.
    showQuestionInPool : function(component, event, helper){
        let payload = event.getParam('row').poolId;
        console.log(payload);
        helper.showQuestions(component, payload);
    },
    // save the exam Id on creation of exam.
    // use to insert question pool.
    handleSuccess : function(component, event, helper){
        let examId = event.getParam("id");
        console.log(examId);
        component.set("v.examId", examId);
        component.set("v.examCreated", true);
        component.find('notifLib').showToast({
            "title": "Success!",
            "message": "The Exam has been inserted successfully."
        });
    },
    // send all modified question pool to be add to question assignment.
    handleCreation : function(component, event, helper){
        component.set("v.examCreated", false);
        helper.createExamAssignment(component, component.get("v.draftValuesMap"), component.get("v.examId"));
    },
    // update map on inline edit of question pool
    updateQuestionQuantity : function(component, event, helper){
        let draftVal = event.getParam('draftValues');
        let draftMap = component.get("v.draftValuesMap");
        let questionPool = component.get("v.questionPool");
        // might need to validate the number entered by user
        // so they don't ask for more question than what is in the pool
        draftMap[draftVal[0].poolId] = draftVal[0].quantity;
        component.set("v.draftValuesMap", draftMap);
    },
    // go to next page
    handlePrev : function(component, event, helper){
        let myMap = component.get("v.questionPoolMap");
        let currentPage = component.get("v.currentPage") - 1;
        component.set("v.questionPool", myMap[currentPage]);
        component.set("v.currentPage", currentPage);
        component.set("v.isLastPage", false);
    },
    // go to previous page
    handleNext : function(component, event ,helper){
        let myMap = component.get("v.questionPoolMap");
        let currentPage = component.get("v.currentPage")+1;
        component.set("v.questionPool", myMap[currentPage]);
        component.set("v.currentPage", currentPage);
        if(!myMap[currentPage+1]){
            component.set("v.isLastPage", true);
        }
    }
    
})