/*
    Authors: Hamza Khan, Nolan Toole
    Date Modified: 9/30/2021  
*/

import { api, LightningElement, track } from 'lwc';
import ImportFile from '@salesforce/apex/AuraGIFTImportController.ImportFile';
import HandleInit from '@salesforce/apex/AuraGIFTImportController.HandleInit';

export default class LwcGiftImport extends LightningElement {
    // Variables
    initMessage='Ready to Import Questions'
    @track
    titans = [];
    @track
    technologies = [];
    valueTitan = '';
    valueTech = 'sf';
    fileName = 'No file selected...';
    fileContents = '';
    toImport = 0;
    submitList = [];
    showQuestions = false;
    submitScreen=false;
    submitError='';
    imported = 0;
    updated = 0;
    successMessage = false;

    // Gets values from salesforce for the Titans and the technologies
    connectedCallback() {
        HandleInit().then((result) => {    
            let valuesMap = result;
            this.technologies = valuesMap["Technologies"];
            this.valueTech = valuesMap["Technologies"][0]["TitanId"];
            this.titans = valuesMap["Titans"];
            this.valueTitan = valuesMap["Titans"][0]["Id"];
            this.initMessage = "Ready to import questions.";
        })
    }

    // Sets the picklist options to select the titan
    get titanOptions() {
        let titanList = [];
        for(let i=0; i<this.titans.length; i++) {
            let t = {
                value: this.titans[i].Id,
                label: this.titans[i].Name,
            };
            titanList.push(t);   
        }
        return titanList;
    }
    
    // Set the possible options for the technologies
    get techOptions() {
        let techList = [];
        for(let i=0; i<this.technologies.length; i++) {
            let t = {
                value: this.technologies[i].TitanId,
                label: this.technologies[i].TechnologyName
            };
            techList.push(t);
        }

        
        return techList;
    }

    // When changing which titan is selected, will display that titans technology
    handleChange(event) {
        this.valueTitan = event.detail.value;
        for(let i in this.technologies){
            if(this.technologies[i]["TitanId"] == this.valueTitan){
                this.valueTech = this.technologies[i]["TitanId"];
            }

        }
    }
    
    // Displays the submit screen when clicking the next button
    handleNext(event) {
        this.submitScreen = true;
    }

    //Taken from the previous iteration, 
    //splitString(): Split each question in text file to its own object and put it in a list.
    //               Send the list along with titan and technology to ApexController.
    // theString: the uploaded file in string form
    // returns apexObjectList: array of objects built from questions split into title, text and answer
    splitString( theString ) {
        // remove comments
        theString = theString.replace( /\/\/.*$/mg, '\n' );
        
        // remove tabs
        theString = theString.replace( /\t/g, '\n' );
        
        // split up each question and answer
        let theSplitString = theString.split( /\r\n\r\n/ );
        
        // list of objects 
        // objects holds 3 piece of questions
        let apexObjectList = [];
        
        // cleaning up the items from
        for ( let i = 0; i < theSplitString.length; i++ ){
            
            // get rid of the starting and ending spaces if there is any.
            theSplitString[i] = theSplitString[i].trimEnd();
            
            if ( theSplitString[i].lastIndexOf( "}" ) < theSplitString[i].length-1 ){
                // get text between ::, if none then it just give back blank
                if ( theSplitString[i].includes( "::" ) ) {
                    var questionTitle = theSplitString[i].substring( theSplitString[i].indexOf( ":" ) + 2, theSplitString[i].lastIndexOf( "::" ) ).replace( /\r?\n|\r/g, '' ).trim();
                } else {
                    var questionTitle = '';
                }
                
                // get everything from inside {}
                let questionAnswer = theSplitString[i].substring( theSplitString[i].indexOf( "{" ) + 1, theSplitString[i].indexOf( "}" ) ).replace( /\r?\n|\r/g, '' ).trim();
                
                // get everything include the answer after the ::
                if ( theSplitString[i].includes( "::" ) ) {
                    var questionText = theSplitString[i].substring( theSplitString[i].lastIndexOf( "::" ) + 2 ).replace( /\r?\n|\r/g, '' ).trim();
                } else {
                    var questionText = theSplitString[i].replace( /\r?\n|\r/g, '' ).trim();
                }
                
                // get rid of the answer part and replace it with 5 underscores
                questionText = questionText.replace( /{.*}/, '_____' );
                
                // put all the properties in the object
                let current = {
                    qTitle : questionTitle, 
                    qText: questionText, 
                    qAnswer: questionAnswer
                };

                // put the object in the list
                apexObjectList.push( current );
                
            } else {
                // get text between ::, if none then it just give back blank
                if ( theSplitString[i].includes( "::" ) ) {
                    var questionTitle = theSplitString[i].substring( theSplitString[i].indexOf( ":" ) + 2, theSplitString[i].lastIndexOf( "::" ) ).replace( /\r?\n|\r/g, '' ).trim();
                } else {
                    var questionTitle = '';
                }
                
                // get text between the last :: and starting {
                if ( theSplitString[i].includes( "::" ) ) {
                    var questionText = theSplitString[i].substring( theSplitString[i].lastIndexOf( "::" )+2, theSplitString[i].lastIndexOf( "{" ) ).replace( /\r?\n|\r/g, '' ).trim();
                } else {
                    var questionText = theSplitString[i].substring( 0, theSplitString[i].lastIndexOf( "{" ) ).replace( /\r?\n|\r/g, '' ).trim();
                }

                // get everything from inside {}
                let questionAnswer = theSplitString[i].substring( theSplitString[i].indexOf( "{" ) + 1, theSplitString[i].indexOf( "}" ) ).replace( /\r?\n|\r/g, '' ).trim();
                
                // put all the properties in the object
                let current = {
                    qTitle : questionTitle, 
                    qText: questionText, 
                    qAnswer: questionAnswer
                };

                // put the object in the list
                apexObjectList.push( current );
            }
        }
        
        // console.log(apexObjectList);
        return apexObjectList;
    }

    // When uploading the .txt file in GIFT Format, will read the file and call splitString() for later use
    handleUploadFile(event) {
        if(event.detail.files.length > 0) {
            let file = event.detail.files[0];
            this.fileName = file['name'];

            let reader = new FileReader();
            reader.readAsText( file );
            reader.onload = () => {
                this.fileContents = reader.result;
                let splitResult = this.splitString( this.fileContents );
                this.submitList = splitResult;
                this.showQuestions = true;
                this.toImport = splitResult.length;
            }
            reader.onerror = function() {
                console.log(reader.error);
              };
            
        }
    }

    // When clicking the cancel button, will go back to the first page and set variables back to initial values
    handleCancel(event) {
        this.submitScreen = false;
        this.showQuestions = false;
        this.submitList = [];
        this.toImport = 0;
    }

    // When clicking the submit button, will display an error if no file selected
    // If there is a file, will use the submitQuestionList() function to save the question records
    //  Additionally will set variables back to initial values and return to the first screen, displaying how many questions have been imported and updated
    handleSubmit(event) {
        if(this.submitList.length > 0) {
            let titan = this.valueTitan;
            let questionList = this.submitList;

            this.submitError = '';
            this.submitScreen = false;
            this.showQuestions = false;

            this.submitQuestionList(questionList, titan);

            this.submitList = [];
            this.toImport = 0;

        } else {
            this.submitError = "You must select a file to upload!";
        }
    }

    // Calls the apex controller in order to save the records
    submitQuestionList(questions, titan) {
        ImportFile({questionList:questions, titan:titan}).then((result) => {
            let userFeedback = result;
            this.successMessage = true;
            this.imported = userFeedback[0];
            this.updated = userFeedback[1];
            this.fileName = 'No file selected...';
        })
        .catch(error => {
            console.log(error);
        })
    }
}