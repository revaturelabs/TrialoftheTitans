import insertData from '@salesforce/apex/lwcCSVUploaderController.insertData';
import { LightningElement, api,track } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

const columnsQuestion =[{ label: 'Name', fieldName: 'Name' },
{ label: 'Question Body', fieldName: 'QuestionBody' },
{ label: 'Expected Answer', fieldName: 'ExpectedAnswer' }];
export default class LwcQCQuestionsImport extends LightningElement {
//replaces the public attributes
@api showcard=false;
@api file;
@api lines;
@api getResults;
@api results;
@api content;
@api fileContents;
@api reader;
@api recordId;
@track error;
@track columnsQuestion = columnsQuestion;
@api uploadedFile = [];

// handle file upload
@api
showFileData(event){
    this.showcard=true;
    this.file = event.target.files[0];
    console.log(this.file)
    //alert(this.file);
    if(this.file) {
        this.reader = new FileReader();
        this.reader.readAsText(this.file, "UTF-8");
        this.reader.onloadend = (() => {  
        this.fileContents = this.reader.result;
            //parse csv to json
        this.getResults = this.csv2Json(this.fileContents);
            //alert(this.getResults);
            //insert file data into database
            //this.createRecord(this.getResults);  
          
        });  
        
        }
    }
   
//convert csv to json  
@api
csv2Json(csvfile){

    this.lines=csvfile.split("\n");
    this.results = [];
    var headers=this.lines[0].split(",");
    for(var i=1;i<this.lines.length;i++){
        var obj = {};
        var currentline=this.lines[i].split(",");
        for(var j=0;j<headers.length;j++){
        obj[headers[j].trim()] = currentline[j].trim();
    }
        this.results.push(obj);
    } 
    //alert(JSON.stringify(this.results));
    //return JavaScript object
    return JSON.stringify(this.results); 

}

//insert data from csv file into database
@api
createRecord(){
//alert(this.getResults);
// calling apex class insertData method
if(this.getResults) {
insertData({strfromle: this.getResults})
    .then(result => {
        this.data = result;
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success!!',
                message: 'QC questions are created according to the CSV file upload!!!',
                variant: 'Success',
            }),
        );
    })
    .catch(error => {
        this.error = error;
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error!!',
                message: JSON.stringify(error),
                variant: 'error',
            }),
        );     
    })

}
}





}