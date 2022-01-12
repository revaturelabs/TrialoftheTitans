/////////////////////////////////////////////////////
//
//  Name: GiftImportController
//  Author: David J. Sellinger
//  Description: Client-side Controller for the GIFT
//               Import component.                
//
///////////////////////////////////////////////////

({	
    // DoInit(): Do init.

    DoInit : function( component, event, helper ) {
        helper.HandleInit( component );
    },
    
    // HandleUploadFile(): On file upload it use file reader to get the text file content
    
    HandleUploadFile : function( component, event, helper ) {
        helper.HandleUpload(component, event, helper);
    },

    // HandleNext(): Next button handler, send user to upload page.
    
    HandleNext : function( component, event, helper ) {
        let iffer = component.get( "v.canUpload" );
        component.set( "v.successMessage", false );
        component.set( "v.canUpload", true );
    },
    
    // HandleSubmit(): Submit handler, submit file to be processed
    
    HandleSubmit : function( component, event, helper ) {
        helper.SubmitClick( component, helper );  
    },
    
    // HandleCancel(): Cancel button handler, cancel file submission
    
    HandleCancel : function( component, event, helper ) {
        // change view back to first view
        component.set( "v.canUpload", false );
        component.set( "v.showQuestions", false );
        
        // empty the displayed file
        component.set( "v.submitList", [] );
        component.set( "v.toImport", 0 );
    },

    // HandleChange(): Handle the change of selectedTechnology option
    
    HandleChange : function( component, event, helper ) {
        // change v.selectedTechnology to have it line up with titan
        component.set( "v.selectedTechnology", component.get("v.selectedTitan" ) );
    }
})