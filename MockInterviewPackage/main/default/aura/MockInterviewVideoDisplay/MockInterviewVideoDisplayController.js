/////////////////////////////////////////////////////
//
//  Name: videoUploaderComponentController.js
//  Author: Kenny Gonzalez
//  Description: This controller handles 4 different actions
//               from the its associated component. The first
//               is the doInit which initializes the recordId
//               attibute which the value being returned from
//               the apex contoller method. The second action
//               is the handleUploadFinished which handles the
//               upload of a file from your local machine. The third
//               action is the displayFile, which passes in a parameter
//               to an apex controller to be able to return a URL in 
//               form of a string to display a video in the component.
//               The last action(downloadFile) passes in a parameter to 
//               an apex controller method to return a file id(ContentDocumentId)
//               in the form of a string to assign it to the lightning:fileCard
//               in the component.
//
///////////////////////////////////////////////////



({
    displayFile : function(component, event, helper) {


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