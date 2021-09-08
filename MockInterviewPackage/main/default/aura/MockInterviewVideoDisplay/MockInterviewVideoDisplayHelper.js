({
    displayFileHelper : function(component, event, helper){
        let getFileURL = component.get("c.getContentId");
         let contentId = component.get("v.recordId");

         getFileURL.setParams({recordId:contentId});
         console.log(contentId);
         getFileURL.setCallback(this,function(response){

            if(response.getState()==="SUCCESS"){
                //console.log(response.getReturnValue());
                //console.log("OMG");
                component.set("v.fileUrl",response.getReturnValue());
                //console.log(component.get("v.fileUrl"));
                component.set("v.display", true);
                component.set("v.display4", false);
            }
         });

         $A.enqueueAction(getFileURL);
    },
    handleUploadFinishedHelper : function(component, event, helper){
        var uploadedFiles = event.getParam("files");
        var documentId = uploadedFiles[0].documentId;
        var fileName = uploadedFiles[0].name;
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": "File "+fileName+" Uploaded successfully."
        });
        toastEvent.fire();
        
        $A.get('e.lightning:openFiles').fire({
            recordIds: [documentId]
        });
    },
    videoCloseButtonHelper : function(component, event, helper){
        component.set("v.display", false);
        component.set("v.display4", true);
    }
})
