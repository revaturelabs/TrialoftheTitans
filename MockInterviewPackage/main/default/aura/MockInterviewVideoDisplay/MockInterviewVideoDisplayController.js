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
        MockInterviewVideoDisplayHelper.displayFileHelper();

    },
    
    videoCloseButton : function(component, event, helper){
        MockInterviewVideoDisplayHelper.videoCloseButtonHelper();
    },
    handleUploadFinished : function(component, event, helper) {
        MockInterviewVideoDisplayHelper.handleUploadFinishedHelper();
        
    }
    
})