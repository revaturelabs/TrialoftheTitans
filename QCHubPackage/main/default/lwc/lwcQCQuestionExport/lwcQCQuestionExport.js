import { api, LightningElement } from 'lwc';
import getQCQuestions from '@salesforce/apex/QCQuestionExportApexController.getQCQuestions';

export default class LwcQCQuestionExport extends LightningElement {
    @api questionList = [];

    connectedCallback() {
        getQCQuestions().then((result) => {
            this.questionList = result;
            console.log(this.questionList);
        })
    }

    @api
    downloadCSV(event) {
        var questions = this.questionList;
        var csv = this.convertToCSV(questions);
        if(csv == null){
            console.log('No values in the csv');
            return;
        }
        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,'+encodeURI(csv);
        hiddenElement.target = '_self';
        hiddenElement.download = 'QCQuestionData.csv';
        document.body.appendChild(hiddenElement);
        hiddenElement.click();
    }

    @api
    convertToCSV(questionList) {
        var stringResult, count, keys, columnDivider, lineDivider;
        
        if(questionList == null || !questionList.length){
            return null;
        }
        columnDivider = ',';
        lineDivider = '\n';

        keys = ['Name', 'Question_Body__c','Expected_Answer__c'];

        stringResult ='';
        stringResult += keys.join(columnDivider);
        stringResult += lineDivider;

        for(var i = 0; i < questionList.length; i++){
            count = 0;

            for(var tempKey in keys){
                var skey = keys[tempKey];
                if(count > 0){
                    stringResult += columnDivider;
                }

                if(questionList[i][skey] != undefined){
                    stringResult += '"'+questionList[i][skey] + '"';
                }else{
                    stringResult += '"'+''+'"';
                }
                
                count++;
            }
            stringResult += lineDivider;
        }
        return stringResult;
    }
}