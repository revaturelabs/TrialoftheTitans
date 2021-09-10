({
    getQCQuestionList : function(component, event, helper){
        helper.loadQuestionList(component, event);
    },
    downloadCSV : function(component, event, helper) {
        var questions = component.get('v.questionList');
        var csv = helper.convertToCSV(component, questions);
        if(csv == null){
            return;
        }
        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,'+encodeURI(csv);
        hiddenElement.target = '_self';
        hiddenElement.download = 'QCQuestionData.csv';
        document.body.appendChild(hiddenElement);
        hiddenElement.click();
    }
    
})
