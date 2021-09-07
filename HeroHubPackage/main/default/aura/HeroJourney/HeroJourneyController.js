/////////////////////////////////////////////////////
//
//  Name: HeroJourneyHelperController.js
//  Author: David Serrano
//  Created: 5/13/2021
//  Updated: 5/25/2021
//  Description: Javascript controller to call methods in helper class
//
///////////////////////////////////////////////////

({
    // TitanClicked(): calls HandleGameChange method in helper class

    TitanClicked : function(component, event, helper){
        helper.HandleGameChange( component, event );
    },
    
    // ContextChange(): gets called when UserContextInfo data gets passed in
    ContextChange : function(component, event, helper){
      if(component.get("v.contextInfo")){
        helper.InitializeTabs(component);
      }
    },

    changeChart : function(component, event, helper){

      component.set('v.currentChart', event.getParam('chartType'));
    
    }, 

    takeExamClicked : function(component, event, helper){
      component.set('v.examId',event.getParams()['examId'])
      component.set('v.takingExam', event.getParams()['takingExam'])
    },
    onFakeBtnClick : function (cmp, event, helper) {
      let examId = cmp.get('v.examId')
      helper.startExamEvent(cmp, event, examId);
    }
})