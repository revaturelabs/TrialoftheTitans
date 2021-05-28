({
    // HandleInit(): Handle init. Get technology and titan values for the picklists.

    HandleInit : function(component) {
        // get initial values from Apex controller
        let action = component.get("c.HandleInit");
        action.setCallback(this, function(response) {
            let state = response.getState();
            if ( state === "SUCCESS" ) {
                let valuesMap = response.getReturnValue();
                component.set("v.technologies", valuesMap["Technologies"]);
                component.set("v.selectedTechnology", valuesMap["Technologies"][0]["TitanId"]);
                // console.log("Default technology: " + component.get("v.selectedTechnology"));
                component.set("v.titans",valuesMap["Titans"]);
                component.set("v.selectedTitan", valuesMap["Titans"][0]["Id"]);
                // console.log("Default titan: " + component.get("v.selectedTitan"));
                component.set("v.initMessage", "Ready to import questions.");
            }
        });
        $A.enqueueAction(action);
    },

    // SplistString(): Split each question in text file to its own object and put it in a list.
    // send the list along with titan and technology to ApexController.

    SplitString : function(component, theString) {
        // remove comments
        theString = theString.replace(/\/\/.*$/mg, '\n');
        
        // remove tabs
        theString = theString.replace(/\t/g, '\n');
        
        // split up each question and answer
        let theSplitString = theString.split(/\r\n\r\n/);
        
        // list of objects 
        // objects holds 3 piece of questions
        let apexObjectList = [];
        
        // cleaning up the items from
        for(let i = 0; i < theSplitString.length; i++){
            
            // get rid of the starting and ending spaces if there is any.
            theSplitString[i] = theSplitString[i].trimEnd();
            
            if(theSplitString[i].lastIndexOf("}") < theSplitString[i].length-1){
                // get text between ::, if none then it just give back blank
                let questionTitle = theSplitString[i].substring(theSplitString[i].indexOf(":") + 2, theSplitString[i].lastIndexOf("::")).replace(/\r?\n|\r/g, '').trim();
                
                // get everything from inside {}
                let questionAnswer = theSplitString[i].substring(theSplitString[i].indexOf("{") + 1, theSplitString[i].indexOf("}")).replace(/\r?\n|\r/g, '').trim();
                
                // get everything include the answer after the ::
                let questionText = theSplitString[i].substring(theSplitString[i].lastIndexOf("::")+2).replace(/\r?\n|\r/g, '').trim();
                
                // get rid of the answer part and replace it with 5 underscores
                questionText = questionText.replace(/{.*}/, '_____');
                
                // put all the properties in the object
                let current = {
                    qTitle : questionTitle, 
                    qText: questionText, 
                    qAnswer: questionAnswer
                };

                // put the object in the list
                apexObjectList.push(current);
                
            }else{
                
                // get text between ::, if none then it just give back blank
                let questionTitle = theSplitString[i].substring(theSplitString[i].indexOf(":") + 2, theSplitString[i].lastIndexOf("::")).replace(/\r?\n|\r/g, '').trim();
                
                // get text between the last :: and starting {
                let questionText = theSplitString[i].substring(theSplitString[i].lastIndexOf("::")+2, theSplitString[i].lastIndexOf("{")).replace(/\r?\n|\r/g, '').trim();
                
                // get everything from inside {}
                let questionAnswer = theSplitString[i].substring(theSplitString[i].indexOf("{") + 1, theSplitString[i].indexOf("}")).replace(/\r?\n|\r/g, '').trim();
                
                // put all the properties in the object
                let current = {
                    qTitle : questionTitle, 
                    qText: questionText, 
                    qAnswer: questionAnswer
                };

                // put the object in the list
                apexObjectList.push(current);
            }
        }
        
        // console.log(apexObjectList);
        return apexObjectList;
    },

    // Submit button handler, submit the file, clear the text and send user back to first page of wizard.
    // Then use helper to parse questions into objects that will be sent toward ApexController
    SubmitClick : function(component, helper) {
        if ( component.get("v.submitList").length > 0 ) {
            let titan = component.get("v.selectedTitan");
            let questionList = component.get("v.submitList");
            // console.log("titan:" + titan);

            // change view back to first view
            component.set("v.submitError", "");
            component.set("v.canUpload", false);
            component.set("v.showQuestions", false);
            
            // submit the question list
            helper.SubmitQuestionList(component, questionList, titan);
            
            // empty the displayed file
            component.set("v.displayList", []);
            component.set("v.submitList", []);
            component.set("v.toImport", 0);
        } else {
            component.set("v.submitError", "You must select a file to upload!");
        }
    },

    SubmitQuestionList : function(component, questions, titan) {
        let action = component.get("c.ImportFile");
        action.setParams({questionList:questions,titan:titan});
        action.setCallback(this, function(response) {
            let state = response.getState();
            console.log("state: " + state);
            if ( state === "SUCCESS" ) {
                // console.log("Imported file: " + JSON.stringify(response.getReturnValue()));
                let userFeedback = response.getReturnValue();
                component.set("v.successMessage", true);
                component.set("v.imported", userFeedback[0]);
                component.set("v.updated",userFeedback[1]);
            }
        });
        $A.enqueueAction(action);
    }
})