import { LightningElement, api } from 'lwc';
import HandleInit from '@salesforce/apex/AuraGIFTImportController.HandleInit';
import ImportFile from '@salesforce/apex/AuraGIFTImportController.ImportFile';//(List<ExamQuestion> questionList, String titan)

export default class GiftImportLwc extends LightningElement {
    @api initMessage;
    @api titans=[{'Name': 'Loading...', 'Id': 0}];
    @api selectedTitan;
    @api technologies=[{'TechnologyName': 'Loading...', 'TitanId': 0}];
    @api selectedTechnology;//="";
    @api canUpload=false;
    @api fileName="No File Selected...";
    @api toImport=0;
    @api showQuestions=false;
    @api submitList;
    @api submitError;
    @api successMessage=false;
    @api imported=0;
    @api updated=0;
    @api recordId;
    
    constructor(){
        super();
        this.HandleInit(); 
    }
    //fills initial values
    async HandleInit(){ //converted
        let valuesMap = await HandleInit(); 
        this.technologies = valuesMap["Technologies"];
        this.selectedTechnology = valuesMap["Technologies"][0]["TitanId"]; 
        
        this.titans = valuesMap["Titans"];
        this.selectedTitan = valuesMap["Titans"][0]["Id"];
        this.initMessage = "Ready to import questions.";
    }

        
    // HandleChange(): Handle the change of selectedTechnology option
    HandleChange() { //converted
        // change selectedTechnology to have it line up with titan
        this.selectedTechnology = this.selectedTitan;
    }

    // HandleNext(): Next button handler, send user to upload page.
    HandleNext() {//converted
        this.successMessage = false;
        this.canUpload = true;
    }

    //On file upload it use file reader to get the text file content
    handleFileUpload(event) { //this doesn't actually do anything? 

        const uploadedFiles = event.target.files;
        var reader = new FileReader();
        reader.readAsText(uploadedFiles[0]);

        var fileContents = '';

        //works, do stuff
        reader.onload = function() {
            fileContents = reader.result;
            let helperResult = this.SplitString( fileContents );
            this.submitList = helperResult;
            this.showQuestions = true;
            this.toImport = helperResult.length;
        }.bind(this);

        //doesn't work yo
        reader.onerror = function() {
            console.log(reader.error);
          };
    }

    // HandleCancel(): Cancel button handler, cancel file submission
    HandleCancel () {
        // change view back to first view
        this.canUpload = false;
        this.showQuestions = false;
        
        // empty the displayed file
        this.submitList = [];
        this.toImport = 0;
    }
        
    // SubmitClick(): Submit button handler, submit the file, clear the text and send user back to first page of wizard.
    //      Then use helper to parse questions into objects that will be sent toward ApexController
    SubmitClick() {
        if ( this.submitList.length > 0 ) {
            let titan = this.selectedTitan;
            let questionList = this.submitList;

            // change view back to first view
            this.submitError = "";
            this.canUpload = false;
            this.showQuestions = false;
            
            // submit the question list
            this.SubmitQuestionList( questionList, titan );
            
            // empty the displayed file
            this.submitList = [];
            this.toImport = 0;
        } else {
            this.submitError = "You must select a file to upload!";
        }
    }

    
    // SubmitQuestionList(): Takes the list of questions and titan and passes it to the Apex
    //      controller for parsing.
    // questions: question list from uploaded file
    // titan: the titan selected by the user on the first screen of wizard

    async SubmitQuestionList( questions, titan ) {
        let userFeedback = await ImportFile({questionList:questions, titan:titan});

        this.successMessage = true;
        this.imported = userFeedback[0];
        this.updated = userFeedback[1];
        this.fileName = "No file selected...";
    }

    // SplitString(): Split each question in text file to its own object and put it in a list.
    //          Send the list along with titan and technology to ApexController.
    // theString: the uploaded file in string form
    // returns apexObjectList: array of objects built from questions split into title, text and answer

    SplitString ( theString ) {

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
        
        //console.log(apexObjectList);
        return apexObjectList;
    }
}