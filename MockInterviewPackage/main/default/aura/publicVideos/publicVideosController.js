/////////////////////////////////////////////////////
//
//  Name: Public Videos JS Controller
//  Author: Alyssa Reed
//  Description: HandleSelectFilter first makes 
//  	sure only one option is checked and then 
//  	displays the correct filtered list of videos
//  	depending on the value of the filter option 
//  	selected. DoInit renders the default filter
//  	option as soon as the component loads.
//
/////////////////////////////////////////////////////

({
    HandleSelectFilter : function(component, event, helper) {
         publicVideosHelper.HandleSelectFilterHelper();
     },
     
     DoInit : function(component, event, helper){
         publicVideosHelper.DoInitHelper();
     }
 
 
 })