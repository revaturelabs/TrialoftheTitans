({	
    // On file upload it use file reader to get the text file content
    // Then use helper to parse questions into objects that will be sent toward ApexController
    HandleUploadFile : function(component, event, helper) {
        let fileName = 'No File Selected..';
        let fileContents = '';
        
        if (event.getSource().get("v.files").length > 0) {
            
            var file = event.getSource().get("v.files")[0];

            fileName = file['name'];
            component.set("v.fileName", fileName);
            
            var reader = new FileReader();
            reader.onload = function(e) {
                fileContents = reader.result;
                
                //console.log(fileContents);
                component.set("v.fileText", fileContents);
                // helper.SplitString(component, fileContents);
            }
            
            // allow the file content to be turn into text
            reader.readAsText(file);
            let test = reader;
        }
        
    },
    
    // Submit handler, send user to upload page.
    HandleNext : function(component, event, helper) {
        let iffer = component.get("v.canUpload");
        component.set("v.successMessage", false);
        component.set("v.canUpload", true);
    },
    
    // Finished button handler, send user back to titan and technology page.
    HandleSubmit : function(component, event, helper) {
        // change view back to first view
        component.set("v.canUpload", false);
        
        // submit the question list
        let titan = component.get("v.selectedTitan");
        let technology = component.get("v.selectedTechnology");
        let questionList = helper.SplitString(component, component.get("v.fileText"));
        console.log("titan:" + titan + " technology:" + technology);
        helper.SubmitQuestionList(component, questionList, titan, technology);
        
        // empty the fileText variable
        component.set("v.fileText", "");
    },
    DoInit : function(component, event, helper) {
        helper.HandleInit(component);
    }
})