({	
    // DoInit(): Do init.

    DoInit : function(component, event, helper) {
        helper.HandleInit(component);
    },
    
    // HandleUploadFile(): On file upload it use file reader to get the text file content
    
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
                let helperResult = helper.SplitString(component, fileContents);
                component.set("v.submitList", helperResult);
                component.set("v.displayList", helperResult);
                component.set("v.showQuestions", true);
                component.set("v.toImport", helperResult.length);
                // console.log(fileContents);
            }
            
            // allow the file content to be turn into text
            reader.readAsText(file);
            let test = reader;
        }
    },

    // HandleNext(): Next button handler, send user to upload page.
    
    HandleNext : function(component, event, helper) {
        let iffer = component.get("v.canUpload");
        component.set("v.successMessage", false);
        component.set("v.canUpload", true);
    },
    
    // HandleSubmit(): Submit handler, submit file to be processed
    
    HandleSubmit : function(component, event, helper) {
        helper.SubmitClick(component, helper);  
    },
    
    // HandleCancel(): Cancel button handler, cancel file submission
    
    HandleCancel : function(component, event, helper) {
        // change view back to first view
        component.set("v.canUpload", false);
        component.set("v.showQuestions", false);
        
        // empty the displayed file
        component.set("v.displayList", []);
        component.set("v.submitList", []);
        component.set("v.toImport", 0);
    },

    // HandleChange(): Handle the change of selectedTechnology option
    
    HandleChange : function(component, event, helper) {
        // change v.selectedTechnology to have it line up with titan
        component.set("v.selectedTechnology", component.get("v.selectedTitan"));
    }
})