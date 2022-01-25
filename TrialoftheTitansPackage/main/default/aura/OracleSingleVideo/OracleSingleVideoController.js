/////////////////////////////////////////////////////
//
//  Name: Oracle Single Video JS Controller
//  Author: Alyssa Reed
//  Description: When "leave feedback" is clicked 
//  	FeedbackFormClick sets feedbackForm to true 
//  	and the associated aura:if will then render
//  	the form. When the 'X' icon is clicked inside
//  	the form CloseForm will set the feedbackForm 
//  	back to false and the feedback form is no 
//  	longer visible.
//
/////////////////////////////////////////////////////


({
	FeedbackFormClick : function(component, event, helper){
            component.set("v.feedbackForm", true);
        },
    
    CloseForm : function(component, event, helper){
        component.set("v.feedbackForm", false);
    }
})