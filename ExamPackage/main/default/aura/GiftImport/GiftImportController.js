({	
    DoInit : function(component, event, helper) {
        helper.HandleInit(component);
    },
    // On file upload it use file reader to get the text file content
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
                let helperResult = helper.SplitString(component, fileContents)
                component.set("v.submitList", helperResult);
                component.set("v.displayList", helperResult);
                component.set("v.toImport", helperResult.length);
                console.log(fileContents);
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
    
    // Submit button handler, submit the file, clear the text and send user back to first page of wizard.
    // Then use helper to parse questions into objects that will be sent toward ApexController
    HandleSubmit : function(component, event, helper) {
        // change view back to first view
        component.set("v.canUpload", false);
        
        // submit the question list
        let titan = component.get("v.selectedTitan");
        let technology = component.get("v.selectedTechnology");
        let questionList = component.get("v.submitList");
        console.log("titan:" + titan + " technology:" + technology);
        helper.SubmitQuestionList(component, questionList, titan, technology);
        
        // empty the displayed file
        component.set("v.displayList", []);
    },
    HandleChange : function(component, event, helper) {
        console.log("You changed me!");
    }
})