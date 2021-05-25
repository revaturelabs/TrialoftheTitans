({
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
                helper.SplitString(component, fileContents, component.get("v.selectedTitan"), component.get("v.selectedTechnology"));
            }
            
            // allow the file content to be turn into text
            reader.readAsText(file);
            let test = reader;
        }
        
    },
    HandleSubmission : function(component, event, helper) {
        let iffer = component.get("v.canUpload");
        component.set("v.canUpload", true);
    },
    HandleUpload : function(component, event, helper) {
        component.set("v.canUpload", false);
    }
})