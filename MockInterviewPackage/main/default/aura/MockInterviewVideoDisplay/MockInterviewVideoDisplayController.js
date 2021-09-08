/////////////////////////////////////////////////////
//
//  Name: MockInterviewVideoDisplayController.js
//  Author: Kenny Gonzalez
//
//  Description: handleUploadFinished handles the
//               upload of a file from your local machine
//
//               displayFile passes in a parameter to an apex controller to be able to return a URL in 
//               the form of a string to display a video in the component
//
//               videoCloseButton closes the video
//
//  Last Updated: 9/8/2021 (Brian McKay) - corrected description and added referenced methods from the videoDisplayComponent (deleted)
///////////////////////////////////////////////////



({
    displayFile : function(component, event, helper) {


         let getFileURL = component.get("c.getContentId");
         let contentId = component.get("v.recordId");

         getFileURL.setParams({recordId:contentId});
         console.log(contentId);
         getFileURL.setCallback(this,function(response){

            if(response.getState()==="SUCCESS"){
                
                component.set("v.fileUrl",response.getReturnValue());
                
                component.set("v.display", true);
                component.set("v.display4", false);
            }
         });

         $A.enqueueAction(getFileURL);

    },
    
    videoCloseButton : function(component, event, helper){
        component.set("v.display", false);
        component.set("v.display4", true);
    },
    handleUploadFinished : function(component, event, helper) {
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
})