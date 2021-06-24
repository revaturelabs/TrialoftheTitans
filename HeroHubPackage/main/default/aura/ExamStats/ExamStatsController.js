/////////////////////////////////////////////////////
//
//  Name: ExamStatsController.js
//  Author: David Serrano
//  Description: Javascript controller to handle event information being passed in
//
///////////////////////////////////////////////////

({
    ExamClicked : function(component, event, helper) {
        helper.DisplayStats( component, event );
    }
})